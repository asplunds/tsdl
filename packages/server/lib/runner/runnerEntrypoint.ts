import { validatePayload } from "./validatePayload";
import findLeaf from "./findLeaf";
import { TSDLError, types } from "@tsdl/core";

/** @internal */
export async function runnerEntrypoint<TBaseContext>(
  router: types.routing.Branch,
  baseContext: TBaseContext,
  payload: string
): Promise<unknown> {
  const parsed = validatePayload(
    payload
  ) as types.client.ClientPayload<unknown>;

  const leaf = findLeaf(parsed.path, router);

  if (!leaf) {
    throw new TSDLError(
      500,
      `no leaf found for path ${parsed.path.join("/")}`
    ).setSource("internal");
  }

  const validatedInput = await (async () => {
    if (!leaf.$inputValidator) {
      return {
        hasInput: false,
        failure: false,
        input: undefined,
      };
    }
    const l = leaf as NonNullable<typeof leaf>;
    const validators = leaf.$inputValidator as types.validation.Validator<
      typeof l.$input
    >;
    const validator =
      "parse" in validators ? validators.parse : validators.validate;

    if (!validator) {
      return {
        hasInput: false,
        failure: false,
        input: undefined,
      };
    }

    try {
      const result = await validator.call(leaf.$inputValidator, parsed.input);

      if (result === true) {
        return {
          hasInput: true,
          failure: false,
          input: parsed.input,
        };
      } else if (result === false) {
        return {
          hasInput: true,
          failure: true,
          input: null,
        };
      }

      return {
        hasInput: true,
        failure: false,
        input: result,
      };
    } catch (e) {
      if (e instanceof TSDLError) {
        throw e;
      }

      return {
        hasInput: true,
        failure: true,
        message: extractErrorMessage(e),
        input: null,
        e,
      };
    }
  })();

  if (validatedInput.failure) {
    throw new TSDLError(400, validatedInput.message)
      .setSource("input")
      .setValidationError(validatedInput.e);
  }

  const middleware = (leaf?.$mw ?? []) as types.routing.MiddlewareCollection[];

  const ctxReduction = await (async () => {
    let ctx: unknown = baseContext;

    for (const [i, mw] of middleware.entries()) {
      try {
        ctx = await mw.cb(ctx, validatedInput.input);
      } catch (e) {
        if (e instanceof TSDLError) {
          throw e;
        }
        return {
          failure: true,
          message: `failed to invoke middleware [${i}] of query ${parsed.path.join(
            "/"
          )}: ${extractErrorMessage(e)}`,
          ctx: null,
        };
      }
    }

    return {
      failure: false,
      ctx,
    };
  })();

  if (ctxReduction.failure) {
    throw new TSDLError(500, ctxReduction.message).setSource("middleware");
  }

  const query = leaf.$query as (arg: {
    ctx: unknown;
    input: unknown;
  }) => unknown;

  const resultOperation = await (async () => {
    try {
      return {
        failure: false,
        result: await query({
          ctx: ctxReduction.ctx,
          input: validatedInput.input,
        }),
      };
    } catch (e) {
      if (e instanceof TSDLError) {
        throw e;
      }
      throw new TSDLError(
        500,

        extractErrorMessage(e)
      ).setSource("application");
    }
  })();

  const cb = (leaf.$cb ?? []) as ((arg: {
    ctx: unknown;
    input: unknown;
    output: unknown;
  }) => unknown)[];

  try {
    await Promise.all(
      cb.map((cb) => {
        return cb({
          ctx: ctxReduction.ctx,
          input: validatedInput.input,
          output: resultOperation.result,
        });
      })
    );
  } catch (e) {
    if (e instanceof TSDLError) {
      throw e;
    }
    throw new TSDLError(500, extractErrorMessage(e)).setSource("output");
  }

  return resultOperation.result;
}

/** @internal */
function extractErrorMessage(e: unknown): string | undefined {
  return e instanceof Error ? e.message : undefined;
}

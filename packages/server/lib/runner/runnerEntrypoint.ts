import { Branch, ClientPayload, TsDLResponse, Validator } from "@tsdl/types";
import validatePayload from "./validatePayload";
import findLeaf from "./findLeaf";
import createResponse from "../clientResponses/createResponse";
import createErrorMessage from "../clientResponses/createErrorMessage";

/** @internal */
export default async function runnerEntrypoint<TBaseContext>(
  router: Branch,
  baseContext: TBaseContext,
  payload: string
): Promise<TsDLResponse<unknown>> {
  const parsed = validatePayload(payload);

  if (!parsed.ok) {
    return parsed;
  }

  const validatedPayload = parsed.payload as ClientPayload<unknown>;

  const leaf = findLeaf(validatedPayload.path, router);

  if (!leaf) {
    return createResponse({
      tsDLInternalError: true,
      code: 500,
      message: createErrorMessage(
        `no leaf found for path ${validatedPayload.path.join("/")}`
      ),
    });
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
    const validators = leaf.$inputValidator as Validator<typeof l.$input>;
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
      const result = await validator.call(
        leaf.$inputValidator,
        validatedPayload.input
      );

      if (result === true) {
        return {
          hasInput: true,
          failure: false,
          input: validatedPayload.input,
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
      return {
        hasInput: true,
        failure: true,
        message: e + "",
        input: null,
      };
    }
  })();

  if (validatedInput.failure) {
    return createResponse({
      tsDLInternalError: false,
      code: 400,
      message: validatedInput.message,
    });
  }

  const middleware = (leaf?.$mw ?? []) as ((arg: unknown) => unknown)[];

  const ctxReduction = await (async () => {
    let ctx: unknown = baseContext;

    for (const [i, mw] of middleware.entries()) {
      try {
        ctx = await mw(ctx);
      } catch (e) {
        return {
          failure: true,
          message: createErrorMessage(
            `failed to invoke middleware [${i}] of query ${validatedPayload.path.join(
              "/"
            )}: ${e}`
          ),
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
    return createResponse({
      tsDLInternalError: false,
      code: 500,
      message: ctxReduction.message,
    });
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
      return {
        failure: true,
        message: createErrorMessage(
          `failed to invoke query on path ${validatedPayload.path.join(
            "/"
          )}: ${e}`
        ),
      };
    }
  })();

  if (resultOperation.failure) {
    return createResponse({
      tsDLInternalError: false,
      code: 500,
      message: resultOperation.message,
    });
  }

  return createResponse({
    tsDLInternalError: false,
    code: 200,
    payload: resultOperation.result,
  });
}

import type { Request, Response, NextFunction } from "express";
import { TSDLError, types } from "@tsdl/core";
import { messages } from "@tsdl/server/lib/messages";
import { createHTTPResponse } from "@tsdl/server/lib/runner/createHTTPResponse";
import { runnerEntrypoint } from "@tsdl/server/lib/runner/runnerEntrypoint";

export function expressTSDL<TBaseContext>(
  router: types.routing.TSDLTree<TBaseContext>,
  ...args: TBaseContext extends undefined
    ? [undefined?]
    : [(req: Request, res: Response, next: NextFunction) => TBaseContext]
) {
  const runner = async (req: Request, res: Response, next: NextFunction) => {
    const payload = (() => {
      const payloadBody = req.body?.payload;
      if (typeof payloadBody === "object" && payloadBody != null) {
        return JSON.stringify(payloadBody);
      }
      const payloadUrl: string | null = (() => {
        const raw = req.query.payload;

        if (!raw) {
          return null;
        } else if (Array.isArray(raw) && typeof raw[0] === "string") {
          return raw[0];
        } else if (typeof raw === "string") {
          return raw;
        }
        return null;
      })();

      const payloadParam = req.params.payload;

      return (() => {
        try {
          return payloadUrl ?? payloadParam;
        } catch {
          return null;
        }
      })();
    })();

    if (!payload) {
      const error = new TSDLError(500, messages.NO_PAYLOAD).setSource(
        "internal"
      );

      return void res
        .status(error.numberCode)
        .send(createHTTPResponse(error.package(), null))
        .end();
    }

    const ctx = args[0]?.(req, res, next);

    try {
      const response = await runnerEntrypoint(router, ctx, payload);
      return void res.status(200).send(createHTTPResponse(null, response));
    } catch (e: unknown) {
      if (e instanceof TSDLError) {
        return void res
          .status(e.numberCode)
          .send(createHTTPResponse(e.package(), null))
          .end();
      } else {
        if (typeof console !== "undefined") {
          console.error(messages.WRONG_ERROR_INSTANCE);
        }
        return void res.status(999).end("internal error");
      }
    }
  };

  return runner;
}

import { TSDLError, types } from "@tsdl/core";
import { createHTTPResponse } from "@tsdl/server/lib/runner/createHTTPResponse";
import { runnerEntrypoint } from "@tsdl/server/lib/runner/runnerEntrypoint";
import { messages } from "@tsdl/server/lib/messages";

export async function bunTSDL<TBaseContext>(
  router: types.routing.TSDLTree<TBaseContext>,
  req: Request,
  res: (content: string, status: number) => Response,
  ...args: TBaseContext extends undefined ? [undefined?] : [TBaseContext]
) {
  const url = new URL(req.url);
  const payload: string | null = (() => {
    const content =
      url.searchParams.get("payload") ??
      (() => {
        try {
          const json = req.json();

          return "payload" in json ? json.payload : json;
        } catch {
          return null;
        }
      })();

    if (!content) {
      return null;
    }

    if (Array.isArray(content)) {
      if (typeof content[0] === "string") {
        return content[0];
      } else {
        return null;
      }
    }

    if (typeof content !== "string") {
      return null;
    } else {
      return content;
    }
  })();

  if (!payload) {
    return res("Invalid payload", 500);
  }

  const ctx = args[0];

  try {
    const response = await runnerEntrypoint(router, ctx, payload);

    return res(JSON.stringify(createHTTPResponse(null, response)), 200);
  } catch (e: unknown) {
    if (e instanceof TSDLError) {
      return res(
        JSON.stringify(createHTTPResponse(e.package(), null)),
        e.numberCode
      );
    } else {
      if (typeof console !== "undefined") {
        console.error(messages.WRONG_ERROR_INSTANCE);
      }
      return res("Internal error", 999);
    }
  }
}

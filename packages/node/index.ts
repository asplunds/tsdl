import { runnerEntrypoint } from "@tsdl/server/lib/runner/runnerEntrypoint";
import { createHTTPResponse } from "@tsdl/server/lib/runner/createHTTPResponse";
import { TSDLError, types } from "@tsdl/core";
import http from "node:http";
import { messages } from "@tsdl/server/lib/messages";

export async function nodeTSDL<TBaseContext>(
  router: types.routing.TSDLTree<TBaseContext>,
  req: http.IncomingMessage,
  res: http.ServerResponse<http.IncomingMessage>,
  ...args: TBaseContext extends undefined ? [undefined?] : [TBaseContext]
) {
  res.setHeader("Content-Type", "application/json");

  const url = (() => {
    try {
      return new URLSearchParams(req.url?.split("?")[1]);
    } catch {
      return null;
    }
  })();

  if (url == null) {
    const error = new TSDLError(500, messages.INVALID_URL).setSource(
      "internal"
    );

    res.writeHead(error.numberCode);

    return void res.end(
      JSON.stringify(JSON.stringify(createHTTPResponse(error.package(), null)))
    );
  }

  const payload = url.get("payload");

  if (!payload) {
    const error = new TSDLError(500, messages.NO_PAYLOAD).setSource("internal");

    res.writeHead(error.numberCode);

    return void res.end(
      JSON.stringify(JSON.stringify(createHTTPResponse(error.package(), null)))
    );
  }
  const ctx = args[0];
  try {
    const response = await runnerEntrypoint(router, ctx, payload);
    res.writeHead(200);
    res.end(JSON.stringify(createHTTPResponse(null, response)));
  } catch (e: unknown) {
    if (e instanceof TSDLError) {
      res.writeHead(e.numberCode);
      return void res.end(
        JSON.stringify(createHTTPResponse(e.package(), null))
      );
    } else {
      res.writeHead(999);
      res.end("internal error");
      if (typeof console !== "undefined") {
        console.error(messages.WRONG_ERROR_INSTANCE);
      }
    }
  }
}

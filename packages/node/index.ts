import { runnerEntrypoint } from "@tsdl/server/lib/runner/runnerEntrypoint";
import { createHTTPResponse } from "@tsdl/server/lib/runner/createHTTPResponse";
import { TSDLError, types } from "@tsdl/core";
import http from "node:http";
import { messages } from "@tsdl/server/lib/messages";

export async function nodeTSDL<TArg, TBaseContext>(
  router: types.routing.InvokableRouter<TArg, TBaseContext>,
  arg: TArg,
  req: http.IncomingMessage,
  res: http.ServerResponse<http.IncomingMessage>
) {
  res.setHeader("Content-Type", "application/json");

  if (!router.$invoke) {
    const error = new TSDLError(500, "internal").setMessage(
      messages.INVOKE_MISSING
    );
    res.writeHead(error.numberCode);

    return void res.end(
      JSON.stringify(createHTTPResponse(error.package(), null))
    );
  }
  const url = (() => {
    try {
      return new URLSearchParams(req.url?.split("?")[1]);
    } catch {
      return null;
    }
  })();

  if (url == null) {
    const error = new TSDLError(500, "internal").setMessage(
      messages.INVALID_URL
    );
    res.writeHead(error.numberCode);

    return void res.end(
      JSON.stringify(JSON.stringify(createHTTPResponse(error.package(), null)))
    );
  }

  const payload = url.get("payload");

  if (!payload) {
    const error = new TSDLError(500, "internal").setMessage(
      messages.NO_PAYLOAD
    );

    res.writeHead(error.numberCode);

    return void res.end(
      JSON.stringify(JSON.stringify(createHTTPResponse(error.package(), null)))
    );
  }

  const ctx: TBaseContext = router.$invoke(arg);
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

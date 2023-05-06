import runnerEntrypoint from "@tsdl/server/lib/runner/runnerEntrypoint";
import { createHTTPResponse } from "@tsdl/server/lib/runner/createHTTPResponse";
import { TSDLError, types } from "@tsdl/core";
import http from "node:http";

export async function tsdlNodeIntegration<TArg, TBaseContext>(
  router: types.routing.Branch & {
    $invoke?: (arg: TArg) => TBaseContext;
  },
  arg: TArg,
  req: http.IncomingMessage,
  res: http.ServerResponse<http.IncomingMessage>
) {
  res.setHeader("Content-Type", "application/json");

  if (!router.$invoke) {
    const error = new TSDLError(500, "internal").setMessage(
      "internal property '$invoke' not defined in provided TSDL router instance"
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
    const error = new TSDLError(500, "internal").setMessage("invalid url");
    res.writeHead(error.numberCode);

    return void res.end(
      JSON.stringify(JSON.stringify(createHTTPResponse(error.package(), null)))
    );
  }

  const payload = url.get("payload");

  if (payload == null) {
    const error = new TSDLError(500, "internal").setMessage("no payload found");

    res.writeHead(error.numberCode);

    return void res.end(
      JSON.stringify(JSON.stringify(createHTTPResponse(error.package(), null)))
    );
  }

  if (!payload || typeof payload !== "string") {
    const error = new TSDLError(500, "internal").setMessage(
      "payload parameter not found"
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
      res.writeHead(500);
      res.end("internal error");
      if (typeof console !== "undefined") {
        console.error(
          "TSDL never: error not of instance TSDLError. This is fatal."
        );
      }
    }
  }
}

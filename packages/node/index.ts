import createErrorMessage from "@tsdl/server/lib/clientResponses/createErrorMessage";
import createResponse from "@tsdl/server/lib/clientResponses/createResponse";
import runnerEntrypoint from "@tsdl/server/lib/runner/runnerEntrypoint";
import { Branch } from "@tsdl/types";
import http from "node:http";

export async function tsdlNodeIntegration<TArg, TBaseContext>(
  router: Branch & {
    $invoke?: (arg: TArg) => TBaseContext;
  },
  arg: TArg,
  req: http.IncomingMessage,
  res: http.ServerResponse<http.IncomingMessage>
) {
  res.setHeader("Content-Type", "application/json");
  if (!router.$invoke) {
    res.writeHead(500);

    return void res.end(
      JSON.stringify(
        createResponse({
          tsDLInternalError: true,
          code: 500,
          message: createErrorMessage(
            "internal property '$invoke' not defined in provided tsDL router instance"
          ),
        })
      )
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
    res.writeHead(500);

    return void res.end(
      JSON.stringify(
        createResponse({
          tsDLInternalError: true,
          code: 500,
          message: createErrorMessage("invalid url"),
        })
      )
    );
  }

  if (url == null) {
    res.writeHead(500);

    return void res.end(
      JSON.stringify(
        createResponse({
          code: 500,
          message: createErrorMessage("no payload found"),
        })
      )
    );
  }

  const payload = url.get("payload");

  if (!payload || typeof payload !== "string") {
    res.writeHead(500);

    return void res.end(
      JSON.stringify(
        createResponse({
          code: 500,
          message: createErrorMessage("payload parameter not found"),
        })
      )
    );
  }

  const ctx: TBaseContext = router.$invoke(arg);
  const response = await runnerEntrypoint(router, ctx, payload);
  res.writeHead(response.code ?? 200);
  res.end(JSON.stringify(response));
}

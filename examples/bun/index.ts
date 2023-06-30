import { createTree, visualizeTree } from "@tsdl/tree";
import { bunTSDL } from "../../packages/bun";
import { router } from "@tsdl/example-common";

console.log("Hello via Bun!");

console.log(visualizeTree(createTree(router)));

Bun.serve({
  port: 9000,
  fetch(req) {
    const url = new URL(req.url);

    if (url.pathname.startsWith("/tsdl")) {
      return bunTSDL(
        router,
        req,
        (content, status) =>
          new Response(content, {
            status,
            headers: {
              "Access-Control-Allow-Origin": "*",
            },
          })
      );
    }

    /* ... */

    return new Response("404!");
  },
});

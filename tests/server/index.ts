import { createTsdl } from "@tsdl/server";
import http from "node:http";
import { tsdlNodeIntegration } from "@tsdl/node";
import { z } from "zod";
import { TSDLError } from "@tsdl/core";
/* import * as yup from "yup"; */

const tsdl = createTsdl(
  (ctx: {
    req: http.IncomingMessage;
    res: http.ServerResponse<http.IncomingMessage>;
  }) => ({
    ...ctx,
    token: ctx.req.headers.authorization,
  })
);

const db = ["apple", "banana", "orange", "apple", "banana"];

let fruit = [
  {
    name: "Apple",
    id: 1,
  },
  {
    name: "Banana",
    id: 2,
  },
  {
    name: "Orange",
    id: 3,
  },
];

const logger = <T>(ctx: T, input: string) => {
  console.log(`Query input: ${input}`);
  return ctx;
};

const router = tsdl.router({
  fruit: tsdl.router({
    addOne: tsdl.input(z.string().regex(/^[\w\s]+$/)).query(({ input }) =>
      fruit.unshift({
        id: Date.now(),
        name: input,
      })
    ),
    removeOne: tsdl.input(z.number()).query(({ input }) => {
      fruit = fruit.filter((v) => v.id !== input);
    }),
    all: tsdl.query(() => fruit),
  }),
  vegetables: tsdl.router({
    fetchOne: tsdl
      .input(
        z.object({
          name: z.string(),
        })
      )
      .query(({ input }) => db.find((v) => v === input.name)),
    addOne: tsdl
      .input(
        z.object({
          name: z.string().regex(/^[\s\d\w]$/),
        })
      )
      .query(({ input }) => {
        db.push(input.name);
      }),
    scrapeOne: tsdl
      .input(z.string())
      .use(logger)
      .query(() => "potato")
      .output((ctx) => {
        ctx.input;
        throw new TSDLError(500);
      }),
    fetchAll: tsdl.query(async () => db),
  }),
});

new TSDLError("Bad Request");

export type Router = typeof router;

const requestListener = (
  req: http.IncomingMessage,
  res: http.ServerResponse<http.IncomingMessage>
) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  if (req.url?.startsWith("/tsdl")) {
    return tsdlNodeIntegration(
      router,
      {
        req,
        res,
      },
      req,
      res
    );
  }
};

const server = http.createServer(requestListener);

server.listen(8000, () => {
  console.log("Backend started");
});

import { createTSDL } from "@tsdl/server";
import http from "node:http";
import { nodeTSDL } from "@tsdl/node";
import { z } from "zod";
import { TSDLError } from "@tsdl/core";
import express from "express";
import { expressTSDL } from "@tsdl/express";
import cors from "cors";
/* import * as yup from "yup"; */

const tsdl = createTSDL(
  (ctx: {
    req: http.IncomingMessage;
    res: http.ServerResponse<http.IncomingMessage>;
  }) => ctx
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

export type Router = typeof router;

const requestListener = (
  req: http.IncomingMessage,
  res: http.ServerResponse<http.IncomingMessage>
) => {
  res.setHeader("Access-Control-Allow-Origin", "localhost");
  if (req.url?.startsWith("/tsdl")) {
    return nodeTSDL(
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
  console.log("Node backend started");
});

const app = express();

app
  .use(cors())
  .use(
    "/tsdl",
    expressTSDL(router, (req, res) => ({ req, res }))
  )
  .listen(9000, () => console.log("Express backend started"));

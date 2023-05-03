import { createTsdl } from "@tsdl/server";
import http from "node:http";
import { tsdlNodeIntegration } from "@tsdl/node";
import { z } from "zod";
import * as yup from "yup";

const tsdl = createTsdl(
  (ctx: {
    req: http.IncomingMessage;
    res: http.ServerResponse<http.IncomingMessage>;
  }) => ctx
);

const db = ["apple", "banana", "orange", "apple", "banana"];

export const router = tsdl.router({
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
        yup.object({
          name: yup
            .string()
            .matches(/^[\d\w]+$/)
            .required()
            .trim(),
        })
      )
      .query(({ input }) => {
        db.push(input.name);
      }),
    fetchAll: tsdl.query(async () => db),
  }),
});

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

server.listen(8000);

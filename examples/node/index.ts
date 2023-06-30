import http from "node:http";
import { nodeTSDL } from "@tsdl/node";
import express from "express";
import { expressTSDL } from "@tsdl/express";
import cors from "cors";
import { createTree, visualizeTree } from "@tsdl/tree";
import { router } from "@tsdl/example-common";
/* import * as yup from "yup"; */

console.log(visualizeTree(createTree(router)));

export type Router = typeof router;

const requestListener = (
  req: http.IncomingMessage,
  res: http.ServerResponse<http.IncomingMessage>
) => {
  res.setHeader("Access-Control-Allow-Origin", "localhost");
  if (req.url?.startsWith("/tsdl")) {
    return nodeTSDL(router, req, res, {
      req,
      res,
    });
  }
};

const server = http.createServer(requestListener);

server.listen(8001, () => {
  console.log("Node backend started");
});

const app = express();

app
  .use(cors())
  .use("/tsdl", expressTSDL(router))
  .listen(9000, () => console.log("Express backend started"));

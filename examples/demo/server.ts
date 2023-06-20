/* eslint-disable @typescript-eslint/no-unused-vars */
import { TSDLError } from "@tsdl/core";
import { tsdl } from "./tsdl";
import { z } from "zod";

const router = tsdl.router({
  fruit: tsdl.router({
    apples: tsdl.input(z.string()).query(() => ["Apple", "Apple2!"]),
  }),
});

export type Router = typeof router;



















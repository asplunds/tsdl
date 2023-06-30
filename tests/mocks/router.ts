import { inputValidator } from "./inputValidator";
import { TSDLError } from "../../packages/core";
import { callbacks } from "./callbacks";
import { createTSDL } from "../../packages/server";

export const tsdl = createTSDL();

export const router = tsdl.router({
  test: tsdl.query(() => 123),
  add: tsdl.input(inputValidator).query(({ input }) => input),
  deep: tsdl.router({
    nested: tsdl.query(() => "ok"),
  }),
  thrown: tsdl.query(() => {
    throw new TSDLError(404);
  }),
  date: tsdl.query(() => new Date(0)),
  ctx: tsdl
    .use(async () => 2)
    .use((p) => p + 2)
    .query(({ ctx }) => ctx),
  output: tsdl.query(() => 123).output((arg) => callbacks.output(arg)),
  documented: tsdl.use
    .doc(
      "Name",
      "Desc"
    )(() => 2)
    .input.doc(
      "Name",
      "Desc"
    )(inputValidator)
    .use.doc(
      "Name2",
      "Desc2"
    )(() => 2)
    .use.doc({ name: "Name3", description: "Desc3" })(() => 4)
    .query.doc(
      "Name",
      "Desc"
    )(() => 0),
});

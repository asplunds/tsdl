import { createTSDL } from "@tsdl/server";
import { TSDLError } from "@tsdl/core";
import { z } from "zod";

const tsdl = createTSDL();

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

export const router = tsdl.router({
  fruit: tsdl.router({
    addOne: tsdl
      .input(z.string().regex(/^[\w\s]+$/))
      /* .use(() => {
        throw new TSDLError("Bad Gateway", "oopsie.123");
      }) */
      .query(({ input }) =>
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
    addOne: tsdl.input
      .doc("aight")(
        z.object({
          name: z.string().regex(/^[\s\d\w]$/),
        })
      )
      .query(({ input }) => {
        db.push(input.name);
      }),
    test: tsdl.use
      .doc("hi")(async () => "sup" as const)
      .input(z.string())
      .use((ctx) => ctx)
      .query(({ ctx, input }) => {
        void ctx;
        //   ^?
        void input;
        //   ^?

        return "ok";
      }),
    scrapeOne: tsdl
      .input(z.string())
      .use.doc("mw1")(logger)
      .use.doc("mw2")(logger)
      .query.doc("Potato")(() => "potato")
      .output((ctx) => {
        ctx.input;
        throw new TSDLError(500);
      }),
    fetchAll: tsdl.query(async () => db),
  }),
});

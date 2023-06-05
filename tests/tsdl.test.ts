import { expect, test, vi } from "vitest";
import { createTSDL } from "../packages/server";
import { createClient } from "../packages/client";
import { runnerEntrypoint } from "../packages/server/lib/runner/runnerEntrypoint";
import { createHTTPResponse } from "../packages/server/lib/runner/createHTTPResponse";
import { TSDLError } from "../packages/core";

const tsdl = createTSDL(() => undefined);

const callbacks = {
  output({ output }: { output: number }) {
    return void output;
  },
};

const router = tsdl.router({
  test: tsdl.query(() => 123),
  add: tsdl
    .input({
      validate: (a: unknown) => {
        if (typeof a === "number") {
          return a;
        }
        throw "invalid";
      },
    })
    .query(({ input }) => input),
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
});

type Router = typeof router;

const client = createClient<Router>(({ payload }) => {
  const fetcher = async () => {
    try {
      const result = await runnerEntrypoint(router, {}, payload);

      return JSON.parse(JSON.stringify(createHTTPResponse(null, result)));
    } catch (e) {
      if (e instanceof TSDLError) {
        return createHTTPResponse(e.package(), null);
      }
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return fetcher() as any;
});

test("request works", async () => {
  expect(await client.test()).toBe(123);
  expect(await client.deep.nested()).toBe("ok");
});

test("queries can throw error", async () => {
  await expect(client.thrown).rejects.toThrow(TSDLError);
});

test.each([1, 0, -1])("correct input works", async (a) => {
  expect(await client.add(a)).toBe(a);
});

test.each(["a", true, undefined, {}, [], null])(
  "wrong input throws",
  async (a) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    await expect(() => client.add(a)).rejects.toThrow(TSDLError);
  }
);

test("dates are serialized", async () => {
  expect(await client.date()).toBe(new Date(0).toJSON());
});

test("ctx pipeline works", async () => {
  expect(await client.ctx()).toBe(4);
});

test("output is called", async () => {
  const outputSpy = vi.spyOn(callbacks, "output");

  await client.output();

  expect(outputSpy).toBeCalledTimes(1);
});

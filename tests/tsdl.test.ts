import { expect, test, vi } from "vitest";
import { createClient } from "../packages/client";
import { createReactQueryClient } from "../packages/reactQuery";
import { TSDLError } from "../packages/core";
import { createFetcher } from "./mocks/fetcher";
import { QueryClient } from "@tanstack/react-query";
import { tsdl } from "./mocks/tsdl";

const callbacks = {
  output({ output }: { output: number }) {
    return void output;
  },
};

const router = tsdl.router({
  test: tsdl.query(() => 123),
  add: tsdl
    .input({
      validate: (a) => {
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

const client = createClient<Router>(createFetcher(router));
const reactClient = createReactQueryClient<Router>(
  createFetcher(router),
  new QueryClient()
);

test.each([client, reactClient])("request works", async (client) => {
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

test.each([client, reactClient])("dates are serialized", async () => {
  expect(await client.date()).toBe(new Date(0).toJSON());
});

test.each([client, reactClient])("ctx pipeline works", async () => {
  expect(await client.ctx()).toBe(4);
});

test.each([client, reactClient])("output is called", async () => {
  const outputSpy = vi.spyOn(callbacks, "output");

  await client.output();

  expect(outputSpy).toBeCalledTimes(1);
});

test("react query integration works", () => {
  expect(reactClient.add.useMutation).toBeDefined();
  expect(reactClient.add.useQuery).toBeDefined();
  expect(reactClient.add.invalidate).toBeDefined();
  expect(reactClient.add.abort).toBeDefined();
});

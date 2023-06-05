import { expect, test } from "vitest";
import createQuery from "../packages/server/lib/createQuery";
import { types } from "../packages/core";

const queries = [[undefined, [123] as unknown[]]] as const;

test.each(queries)("create queries should be correct", (validator, mw) => {
  const created = createQuery(validator, mw);
  expect(created).toHaveProperty("query");
  expect(created).toBeDefined();
});

test.each(queries)("queries should be correct", (validator, mw) => {
  const created = createQuery(validator, mw);

  const arg = () => 123;
  const query = created.query(arg);

  expect(query.$arg).toBeDefined();
  expect(query.$return).toBeDefined();
  expect(query.$mw).toStrictEqual(mw);
  expect(query.$inputValidator).toBe(validator);
  expect(query.$arg.ctx).toBeDefined();
  expect(query.$arg.input).toBeDefined();
  expect(query.$cb).toStrictEqual([]);
  expect(query.$query).toBe(arg);
  expect(query.$type).toBe(types.routing.TsDLNode.Leaf);
});

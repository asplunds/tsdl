import { expect, test } from "vitest";
import createRouter from "../packages/server/lib/createRouter";
import { types } from "../packages/core";

const routers = [createRouter()];

test.each(routers)("create router should work", (a) => {
  expect(a).toHaveProperty("router");
});

test.each(routers.map((v) => v.router))("invoking router should work", (a) => {
  for (const routes of [{}]) {
    const router = a(routes);
    expect(router).toHaveProperty("$routes");
    expect(router).toHaveProperty("$type");
    expect(router).toHaveProperty("$bc");
    expect(router.$type).toBe(types.routing.TSDLNode.Node);
    expect(router.$routes).toBe(routes);
  }
});

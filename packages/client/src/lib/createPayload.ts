import { types } from "@tsdl/core";

export function createPayload(
  path: string[],
  input: unknown
): types.client.ClientPayload<unknown> {
  return {
    path,
    input,
  } satisfies types.client.ClientPayload<unknown>;
}

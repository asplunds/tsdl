import { ClientPayload } from "@tsdl/types";

export function createPayload(
  path: string[],
  input: unknown
): ClientPayload<unknown> {
  return {
    path,
    input,
  } satisfies ClientPayload<unknown>;
}

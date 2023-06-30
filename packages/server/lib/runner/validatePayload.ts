import { TSDLError, types } from "@tsdl/core";

const allowedKeys: (keyof types.client.ClientPayload<unknown>)[] = [
  "path",
  "input",
];

/** @internal */
export function validatePayload(payload: string): unknown {
  const parsed = (() => {
    try {
      return JSON.parse(payload);
    } catch {
      return null;
    }
  })();

  // Commence budget zod, lol. Should probably refactor this and unit test it...
  if (!parsed) {
    throw new TSDLError(500, "unable to parse payload").setSource("internal");
  }

  if (typeof parsed !== "object") {
    throw new TSDLError(500, "parsed payload incorrect type").setSource(
      "internal"
    );
  }

  const keys = Object.keys(parsed);

  if (keys.length !== allowedKeys.length) {
    throw new TSDLError(500, "parsed payload invalid key count").setSource(
      "internal"
    );
  }

  if (!allowedKeys.every((v) => keys.includes(v))) {
    throw new TSDLError(500, "parsed payload invalid key literals").setSource(
      "internal"
    );
  }

  return parsed;
}

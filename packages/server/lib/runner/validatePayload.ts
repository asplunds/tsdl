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

  // Commence budget zod, lol.
  if (!parsed) {
    throw new TSDLError(500).setMessage("unable to parse payload");
  }

  if (typeof parsed !== "object") {
    throw new TSDLError(500).setMessage("parsed payload incorrect type");
  }

  const keys = Object.keys(parsed);

  if (keys.length !== allowedKeys.length) {
    throw new TSDLError(500).setMessage("parsed payload invalid key count");
  }

  if (!allowedKeys.every((v) => keys.includes(v))) {
    throw new TSDLError(500).setMessage("parsed payload invalid key literals");
  }

  return parsed;
}

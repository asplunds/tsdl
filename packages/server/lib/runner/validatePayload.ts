import { ClientPayload, TsDLResponse } from "@tsdl/types";
import createResponse from "../clientResponses/createResponse";
import createErrorMessage from "../clientResponses/createErrorMessage";

const allowedKeys: (keyof ClientPayload<unknown>)[] = ["path", "input"];

/** @internal */
export default function validatePayload(
  payload: string
): TsDLResponse<unknown> {
  const parsed = (() => {
    try {
      return JSON.parse(payload);
    } catch {
      return null;
    }
  })();

  // Commence budget zod, lol.
  if (!parsed) {
    return createResponse({
      tsDLInternalError: true,
      code: 500,
      message: createErrorMessage("unable to parse payload"),
    });
  }

  if (typeof parsed !== "object") {
    return createResponse({
      tsDLInternalError: true,
      code: 500,
      message: createErrorMessage("parsed payload incorrect type"),
    });
  }

  const keys = Object.keys(parsed);

  if (keys.length !== allowedKeys.length) {
    return createResponse({
      tsDLInternalError: true,
      code: 500,
      message: createErrorMessage("parsed payload invalid key count"),
    });
  }

  if (!allowedKeys.every((v) => keys.includes(v))) {
    return createResponse({
      tsDLInternalError: true,
      code: 500,
      message: createErrorMessage("parsed payload invalid key literals"),
    });
  }

  return createResponse({
    tsDLInternalError: false,
    payload: parsed,
  });
}

import { types } from "@tsdl/core";

export function createHTTPResponse<
  TValidationError = unknown,
  TPayload = unknown
>(
  error: types.common.TSDLErrorPackage<TValidationError> | null,
  payload: TPayload
) {
  return {
    error,
    payload,
  } satisfies types.common.HTTPResponse<TValidationError, TPayload>;
}

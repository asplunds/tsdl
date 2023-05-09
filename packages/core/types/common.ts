import { errorCodes } from "../lib/errors/errorCodes";
import { Source } from "./error";

export type TSDLErrorPackage<TValidationError = unknown> = {
  $schema: "TSDLError";
  code: keyof typeof errorCodes;
  message?: string;
  validationError?: TValidationError;
  source: Source;
};

export type HTTPResponse<TValidationError = unknown, TPayload = unknown> = {
  error: null | TSDLErrorPackage<TValidationError>;
  payload: TPayload;
};

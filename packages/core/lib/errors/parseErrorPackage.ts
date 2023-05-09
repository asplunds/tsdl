import { TSDLErrorPackage } from "../../types/common";
import { TSDLError } from "./errorConstructor";

/** Create a TSDLError instance from a package */
export function parseErrorPackage<TValidationError>(
  payload: unknown
): TSDLError<TValidationError> | null {
  try {
    if (payload != null && typeof payload === "object") {
      if ("$schema" in payload && payload.$schema === "TSDLError") {
        const schema = payload as TSDLErrorPackage<TValidationError>;

        return new TSDLError<TValidationError>(schema.code, schema.source)
          .setMessage(schema.message)
          .setValidationError(schema.validationError);
      }
    }
  } catch {
    return null;
  }
  return null;
}

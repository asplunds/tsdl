import { TSDLError } from "./errorConstructor";
/** Create a TSDLError instance from a package */
export declare function parseErrorPackage<TValidationError>(payload: unknown): TSDLError<TValidationError> | null;

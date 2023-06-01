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
type Primitives = string | number | undefined | null | boolean;
export type ParsedJSON<T> = T extends infer R ? R extends Primitives ? R : R extends Map<unknown, unknown> ? "{}" : R extends Set<unknown> ? "{}" : R extends {
    toJSON(): unknown;
} ? ReturnType<R["toJSON"]> : R extends object ? {
    [Key in keyof R]: ParsedJSON<R[Key]>;
} : never : never;
export {};

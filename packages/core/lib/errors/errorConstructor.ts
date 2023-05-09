import { TSDLErrorPackage } from "../../types/common";
import { Source } from "../../types/error";
import { errorCodes, errorCodesReversed } from "./errorCodes";

export class TSDLError<TValidationError = unknown> {
  private $code: keyof typeof errorCodes;
  private $message?: string;
  private $validationError?: TValidationError;
  private $source: Source;
  constructor(
    code:
      | keyof typeof errorCodes
      | (typeof errorCodes)[keyof typeof errorCodes],
    source: Source = "application"
  ) {
    this.$source = source;
    if (typeof code === "number") {
      const match = errorCodesReversed[code];
      if (match == null || !(match in errorCodes)) {
        throw InvalidCodeError();
      }
      this.$code = match;
    } else {
      if (!(code in errorCodes)) {
        throw InvalidCodeError();
      }
      this.$code = code;
    }
  }
  setMessage(message?: string) {
    this.$message = message;
    return this;
  }
  setValidationError(error?: TValidationError) {
    this.$validationError = error;
    return this;
  }

  get code() {
    return this.$code;
  }
  get numberCode() {
    return errorCodes[this.$code];
  }
  get message() {
    return this.$message;
  }
  get validationError() {
    return this.$validationError;
  }
  get semanticErrorMessage() {
    return `Error: ${this.$code}. Source: ${this.$source}`;
  }

  package(): TSDLErrorPackage<TValidationError> {
    return {
      $schema: "TSDLError",
      code: this.$code,
      message: this.$message,
      validationError: this.$validationError,
      source: this.$source,
    } satisfies TSDLErrorPackage<TValidationError>;
  }

  toString(): string {
    return JSON.stringify(this.package());
  }

  static fromPackage<TValidationError>(
    pkg: TSDLErrorPackage<TValidationError>
  ) {
    return new TSDLError(pkg.code)
      .setMessage(pkg.message)
      .setValidationError(pkg.validationError);
  }
}

/** @internal */
function InvalidCodeError() {
  return new Error("Invalid code");
}

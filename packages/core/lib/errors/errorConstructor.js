"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TSDLError = void 0;
const errorCodes_1 = require("./errorCodes");
class TSDLError {
  constructor(code, message) {
    this.$source = "application";
    this.$message = message;
    if (typeof code === "number") {
      const match = errorCodes_1.errorCodesReversed[code];
      if (match == null || !(match in errorCodes_1.errorCodes)) {
        throw InvalidCodeError();
      }
      this.$code = match;
    } else {
      if (!(code in errorCodes_1.errorCodes)) {
        throw InvalidCodeError();
      }
      this.$code = code;
    }
  }
  setSource(source) {
    this.$source = source;
    return this;
  }
  setMessage(message) {
    this.$message = message;
    return this;
  }
  setValidationError(error) {
    this.$validationError = error;
    return this;
  }
  get code() {
    return this.$code;
  }
  get numberCode() {
    return errorCodes_1.errorCodes[this.$code];
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
  package() {
    return {
      $schema: "TSDLError",
      code: this.$code,
      message: this.$message,
      validationError: this.$validationError,
      source: this.$source,
    };
  }
  toString() {
    return JSON.stringify(this.package());
  }
  static fromPackage(pkg) {
    return new TSDLError(pkg.code)
      .setMessage(pkg.message)
      .setValidationError(pkg.validationError);
  }
}
exports.TSDLError = TSDLError;
/** @internal */
function InvalidCodeError() {
  return new Error("Invalid code");
}
//# sourceMappingURL=errorConstructor.js.map

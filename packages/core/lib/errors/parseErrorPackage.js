"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseErrorPackage = void 0;
const errorConstructor_1 = require("./errorConstructor");
/** Create a TSDLError instance from a package */
function parseErrorPackage(payload) {
  try {
    if (payload != null && typeof payload === "object") {
      if ("$schema" in payload && payload.$schema === "TSDLError") {
        const schema = payload;
        return new errorConstructor_1.TSDLError(schema.code, schema.source)
          .setMessage(schema.message)
          .setValidationError(schema.validationError);
      }
    }
  } catch (_a) {
    return null;
  }
  return null;
}
exports.parseErrorPackage = parseErrorPackage;
//# sourceMappingURL=parseErrorPackage.js.map

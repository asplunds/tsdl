export const inputValidator = {
  validate: (a: unknown) => {
    if (typeof a === "number") {
      return a;
    }
    throw "invalid";
  },
};

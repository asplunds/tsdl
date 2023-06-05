type ZodInput<T> = { parse: (arg: unknown) => T };
type YupInput<T> = { validate: (arg: unknown) => T; __context: unknown };
type GenericInput<T> = { validate: (arg: unknown) => T };

export type Validator<T> = GenericInput<T> | ZodInput<T> | YupInput<T>;

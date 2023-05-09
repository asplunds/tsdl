type ZodInput<T> = { parse: (arg: unknown) => T };
type YupInput<T> = { validate: (arg: unknown) => T; __context: unknown };

export type Validator<T> = ZodInput<T> | YupInput<T>;

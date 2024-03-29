[//]: <> (AUTO GENERATED - DO NOT EDIT ME. EDIT README IN PROJECT ROOT)

TSDL Bun integration

@tsdl/bun, [@tsdl/client](https://npmjs.com/package/@tsdl/client), [@tsdl/core](https://npmjs.com/package/@tsdl/core), [@tsdl/dashboard](https://npmjs.com/package/@tsdl/dashboard), [@tsdl/express](https://npmjs.com/package/@tsdl/express), [@tsdl/gui](https://npmjs.com/package/@tsdl/gui), [@tsdl/node](https://npmjs.com/package/@tsdl/node), [@tsdl/react-query](https://npmjs.com/package/@tsdl/react-query), [@tsdl/server](https://npmjs.com/package/@tsdl/server), [@tsdl/tree](https://npmjs.com/package/@tsdl/tree)

***
<div align="center">
<img src="https://raw.githubusercontent.com/asplunds/tsdl/main/meta/docs/components/misc/Logo/logo.svg" alt="drawing" width="80"/> <h1>Type-Safe Data Layer</h1> <p></p>
</div>

TSDL, short for Type-Safe Data Layer, is a transport layer designed to blur the line between client and server side. TSDL is an end-to-end http communication framework that makes your backend a type-safe library for your frontend.

👉 [Installation](https://tsdl.asplund.dev/docs/getting-started/installation)

## Example code

### Server side
```ts
const router = tsdl.router({
   auth: tsdl.router({
      login: tsdl // ✓ structured and nestable routes, easily refactored
         .use(logger) // ✓ reusable and powerful middleware support
         .use(cors)
         .input(loginSchema) // ✓ Zod, Ajv, Joi, Yup etc. or custom
         .query(async ({ input }) => {
            input.username // ✓ type inferred and input schema validated
            const user = await db.findOne({
               where: { username: input.username }
            });

            if (!user) {
               // ✓ consistent and simple error handling
               throw new TSDLError(404, "oops");
            }
            // ✓ return any JS value to the client
            return user;
         }),
   }),
});
```

### Client side
```ts
const onSubmit = async () => {
   try {
      const result = await tsdl.auth.login({
         username: form.username, // ✓ write with confidence, inputs are type safe
      });

      // ✓ correctly inferred JSON serialized type
      console.log(result);
   } catch(e) {
      // (e is unknown by default, this is just for type inference)
      if (e instanceof TSDLError) {
         // ✓ handle errors with confidence and consistency
         console.log(e.message); // "oops"
         console.log(e.code); // "Not Found"
         console.log(e.numberCode); // 404
      }
   }
}
```
Ready to dive in? [Getting started guide](https://tsdl.asplund.dev/docs/getting-started/introduction)
## Links

- [Documentation](https://tsdl.asplund.dev/docs/getting-started/introduction)
- [Installation](https://tsdl.asplund.dev/docs/getting-started/installation)
- [Server setup](https://tsdl.asplund.dev/docs/getting-started/server-code-setup)
- [Client setup](https://tsdl.asplund.dev/docs/getting-started/client-code-setup)

## Features

### Replaces

- ~~Rest APIs~~
- ~~Express/Koa/Nest etc.~~
- ~~GraphQL~~

### Introduces

- Type-safe back-end architecture
- Incrementally adoptable — works alongside existing Node infrastructure
- [Express.js support](https://tsdl.asplund.dev/docs/getting-started/server-code-setup) `@tsdl/express`
- [Built-in documentation](https://tsdl.asplund.dev/docs/api/documented)
- [Generate un-opinionated AST](https://tsdl.asplund.dev/docs/api/documented#auto-docs) of (documented) back-end `@tsdl/tree`
- [Type-safe and implicit input validation](https://tsdl.asplund.dev/docs/api/input)
- [Type-safe and powerful middleware](https://tsdl.asplund.dev/docs/api/middleware)
- Modular API (install only what you need)
- [TanStack Query (FKA React Query)](https://tanstack.com/query/latest/docs/react/overview) and [SWR](https://swr.vercel.app/) integration `@tsdl/react-query`
- [Consistent error handling](https://tsdl.asplund.dev/docs/api/TSDLError)
- And [more](https://tsdl.asplund.dev)...

## Contributing

TSDL is developed as a monorepo using [Nx](https://nx.dev/) for cloud runs and caching as well as [Lerna](https://lerna.js.org/) for package linking and publishing.

1. Clone the repository
   ```sh
   git clone https://github.com/asplunds/tsdl.git tsdl
   ```
2. Install dependencies (also initializes husky, & symlinks packages)
   ```sh
   npm i
   ```
3. Start hacking! Unit tests are located in /tests. For playing, use /playground (it's git ignored but included in workspaces). You can find examples in /examples.

### Docs (nextra)

1. `cd meta/docs`
2. `npm run dev` (assuming dependencies are installed)
3. `npm run build` check that it builds
4. `npm run start` preview

## Publishing (access only)

### Publish npm packages

1. Run lints, build packages, bump package versions and publish
   ```sh
   npm run release
   ```

### Detecting circular dependencies

If you suspect you have caused a circular dependency (easily done in monorepos), you can run `npx madge -c` in the project root.

### Deploying documentation

Merge into branch `preview` (for preview) or branch `docs` for live. The CI/CD workflows will automatically build the Nextra documentation site and deploy it to Cloudflare.

## Credits

TSDL was originally created by the developers at [Enter Technologies](https://entertech.se), it's used internally on projects such as [GyRank](https://gyrank.se) and [markanvisning.se](https://markanvisning.se) but was later open sourced.

- [Nextra](https://nextra.site/) for documentation
- [TanStack Query](https://tanstack.com/query/latest/docs/react/overview) for the awesome query library
- [gRPC/tRPC](https://trpc.io/) for inspiration (see [migration guide](https://tsdl.asplund.dev) from gRPC/tRPC to TSDL)
- [Nx](https://nx.dev/) cloud runs
- [Lerna](https://lerna.js.org/) monorepo tool
- [TypeScript](https://typescriptlang.org/)
- [Vitest](https://vitest.dev/) unit testing

***
This README is auto-generated
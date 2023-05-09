# [TSDL](https://tsdl.asplund.dev)

TSDL, short for TypeScript as Data Layer, is a transport layer designed to blur the line between client and server side. TSDL is an end-to-end http communication framework that makes your backend a type-safe library for your frontend.

## Links

- [Documentation](https://tsdl.asplund.dev)
- [Getting started](https://tsdl.asplund.dev/docs/getting-started/introduction)
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
- [Type-safe and implicit input validation](https://tsdl.asplund.dev/docs/api/input)
- [Type-safe and powerful middleware](https://tsdl.asplund.dev/docs/api/middleware)
- Modular (install only what you need)
- [TanStack Query (FKA React Query)](https://tanstack.com/query/latest/docs/react/overview) and [SWR](https://swr.vercel.app/) integration
- Consistent error handling

## Contributing

TSDL is developed as a monorepo using [Nx](https://nx.dev/) for cloud runs and caching as well as [Lerna](https://lerna.js.org/) for package linking and publishing.

1. Clone the repository
   ```sh
   git clone https://github.com/asplunds/tsdl.git tsdl
   ```
2. Install dependencies (also initializes husky & symlinks packages)
   ```sh
   npm i
   ```
3. Start hacking! Official tests are located in /tests. For playing, use /playground (it's git ignored but included in workspaces)

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

Merge into branch `preview` (for preview) or branch `docs` for live. The CI/CD workflows will automatically build the nextra documentation site and deploy it to Cloudflare.

## Credits

TSDL was originally created by the developers at [Enter Technologies](https://entertech.se), it's used internally on projects such as [GyRank](https://gyrank.se) and [markanvisning.se](https://markanvisning.se) but was later open sourced.

- [Nextra](https://nextra.site/) for documentation
- [TanStack Query](https://tanstack.com/query/latest/docs/react/overview) for the awesome query library
- [tRPC](https://trpc.io/) for inspiration (see [migration guide](https://tsdl.asplund.dev) from tRPC to TSDL)
- [Nx](https://nx.dev/) cloud runs
- [Lerna](https://lerna.js.org/) amazing monorepo tool
- [TypeScript](https://typescriptlang.org/) ❤️

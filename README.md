# [TSDL](https://tsdl.asplund.dev)

Turn your backend into a library

## Introduction

TSDL, short for TypeScript as Data Layer, is a transport layer designed to blur the line between client and server side. TSDL is an end-to-end communication framework that makes your back-end a Type-safe library for your front-end.

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

## Publishing (access only)

### Publish npm packages

1. Run lints, build packages, bump package versions and publish
   ```sh
   npm run release
   ```

### Detecting circular dependencies

If you suspect you have caused a circular dependency (easily done in monorepos), you can run `npx madge -c` in the project root.

### Updating the documentation site

Merge into `preview` (for preview) or `docs` for live. The CI/CD workflows will automatically build the nextra documentation site and deploy it to Cloudflare.

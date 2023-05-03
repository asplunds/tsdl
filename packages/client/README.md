## @tsdl/client

TSDL vanilla client

---

# [TSDL](https://tsdl.asplund.dev)

## Introduction

TSDL, short for TypeScript as Data Layer, is a transport layer designed to blur the line between client and server side.
In effect, TSDL aims to make your backend a library with full implicit type safety.
TSDL is an improvement of existing RPC technologies and is designed to make migrating from tRPC painless.

Another aspect of this transport layer is its framework agnostic approach, TSDL is designed to work seamlessly with any client-side framework or application because it does not introduce any framework specific dependencies. To clarify,
TSDL does come with some helpers to integrate better with frameworks. However,
the core library will always be standalone.

Move fast; don't break things ⤵️

## Links

- [Getting started](https://tsdl.asplund.dev/docs/getting-started/introduction)
- [Installation](https://tsdl.asplund.dev/docs/getting-started/installation)
- [Server setup](https://tsdl.asplund.dev/docs/getting-started/server-code-setup)
- [Client setup](https://tsdl.asplund.dev/docs/getting-started/client-code-setup)

## Contributing

TSDL is developed as a monorepo using [nx](https://nx.dev/) for cloud runs and caching as well as [lerna](https://lerna.js.org/) for package linking and publishing.

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

1. Run lints, build packages, bump package versions and publish

```sh
npm run release
```

---

This README file was generated automatically at 5/3/2023, 6:35:57 PM

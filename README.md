# Explorer

### Apps and Packages

This is a monorepo built with [Turborepo](https://turbo.build/repo). These are the workspaces inside:

- `apps/web`: the main app built with [Next.js](https://nextjs.org/)
- `apps/desktop`: the desktop app built with electron, this is just a wrapper around the web app
- `packages/@modularcloud/headless`: headless utils used to fetch data from the different chains
- `packages/tsconfig`: `tsconfig.json`s used throughout the monorepo
- `packages/eslint-config-custom`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`)

### Build

To build all apps and packages, run the following command:

```
npm run build
```

### Develop

To develop all apps and packages, run the following command:

```
npm run dev
```

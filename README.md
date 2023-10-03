# Explorer
### Apps and Packages

This is a monorepo built with [Turborepo](https://turbo.build/repo). These are the workspaces inside:

- `web`: the main app built with [Next.js](https://nextjs.org/)
- `eslint-config-custom`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`)
- `tsconfig`: `tsconfig.json`s used throughout the monorepo
- `tailwind-confg`: the [TailwindCSS](https://tailwindcss.com) configuration

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

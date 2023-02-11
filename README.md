# Explorer

### Apps and Packages
This is a monorepo built with [Turborepo](https://turbo.build/repo). These are the workspaces inside:
- `web`: the main app built with [Next.js](https://nextjs.org/)
- `workshop`: a [Storybook](https://storybook.js.org) instance for UI development
- `@modularcloud/design-system`: the UI component library
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

### Troubleshooting
**Storybook throws error when using "npm run dev"**
```
workshop:dev: [storybook] Killed
workshop:dev: [storybook] npm ERR! Lifecycle script `watch:storybook` failed with error: 
workshop:dev: [storybook] npm ERR! Error: command failed 
workshop:dev: [storybook] npm ERR!   in workspace: workshop@0.0.0 
workshop:dev: [storybook] npm ERR!   at location: /workspaces/explorer/apps/workshop 
workshop:dev: [storybook] npm run watch:storybook exited with code 1
```
Try running Storybook alone
```bash
cd apps/workshop
npm run dev
```
Then after it runs successfuly by itself, close it and run the full monorepo.
```bash
cd ../..
npm run dev
```
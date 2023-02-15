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
***Or a different error...***
```
workshop:dev: [storybook] node:internal/crypto/hash:71
workshop:dev: [storybook]   this[kHandle] = new _Hash(algorithm, xofLen);
workshop:dev: [storybook]                   ^
workshop:dev: [storybook] 
workshop:dev: [storybook] Error: error:0308010C:digital envelope routines::unsupported
workshop:dev: [storybook]     at new Hash (node:internal/crypto/hash:71:19)
workshop:dev: [storybook]     at Object.createHash (node:crypto:140:10)
workshop:dev: [storybook]     at module.exports (/workspaces/explorer/node_modules/webpack/lib/util/createHash.js:135:53)
workshop:dev: [storybook]     at NormalModule._initBuildHash (/workspaces/explorer/node_modules/webpack/lib/NormalModule.js:417:16)
workshop:dev: [storybook]     at handleParseError (/workspaces/explorer/node_modules/webpack/lib/NormalModule.js:471:10)
workshop:dev: [storybook]     at /workspaces/explorer/node_modules/webpack/lib/NormalModule.js:503:5
workshop:dev: [storybook]     at /workspaces/explorer/node_modules/webpack/lib/NormalModule.js:358:12
workshop:dev: [storybook]     at /workspaces/explorer/node_modules/loader-runner/lib/LoaderRunner.js:373:3
workshop:dev: [storybook]     at iterateNormalLoaders (/workspaces/explorer/node_modules/loader-runner/lib/LoaderRunner.js:214:10)
workshop:dev: [storybook]     at Array.<anonymous> (/workspaces/explorer/node_modules/loader-runner/lib/LoaderRunner.js:205:4) {
workshop:dev: [storybook]   opensslErrorStack: [ 'error:03000086:digital envelope routines::initialization error' ],
workshop:dev: [storybook]   library: 'digital envelope routines',
workshop:dev: [storybook]   reason: 'unsupported',
workshop:dev: [storybook]   code: 'ERR_OSSL_EVP_UNSUPPORTED'
workshop:dev: [storybook] }
workshop:dev: [storybook] 
workshop:dev: [storybook] Node.js v19.5.0
workshop:dev: [storybook] npm ERR! Lifecycle script `watch:storybook` failed with error: 
workshop:dev: [storybook] npm ERR! Error: command failed 
workshop:dev: npm ERR!   in workspace: workshop@0.0.0 
workshop:dev: [storybook] npm ERR!   at location: /workspaces/explorer/apps/workshop 
workshop:dev: [storybook] npm run watch:storybook exited with code 1
```
Use Node version 16 (`nvm install 16`). Node 19 specifically is incompatible. Alternatively, you can use this flag when running Node: `"--openssl-legacy-provider"` i.e. `npm run dev "--openssl-legacy-provider"`
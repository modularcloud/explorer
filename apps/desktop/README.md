# Modular Cloud desktop app

## How to run the project

1. Build the nextjs app :
   
   ```bash
   # go to the root
   cd ../..

   # build the nextjs app
   npx turbo run build --filter web
   ```

   You may get an error when building the app, 
   for that you can go to the web folder and build it manuaally : 
   
   ```bash
   cd apps/web
   npm run prefetch:networks
   npm run build
   ```

2. Export the built files from the next app :
   
   ```bash
   cd apps/web
   npm run prepare-electron
   ```

3. Run the desktop project :  

   ```bash
   npx electron index.js
   ```

4. (Optional) Build and release the project :  

   ```bash
   TODESKTOP_ACCESS_TOKEN=<token> TODESKTOP_EMAIL=<email>  todesktop build
   ```
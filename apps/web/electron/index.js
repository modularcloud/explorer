const { app, BrowserWindow } = require("electron");
const todesktop = require("@todesktop/runtime");
require("./standalone/apps/web/server.js");

todesktop.init();

function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 900,
    titleBarStyle: "hidden",
    titleBarOverlay: {
      height: 35,
    },
    webPreferences: {
      nodeIntegration: true,
      devTools: !app.isPackaged,
    },
  });

  // and load the index.html of the app.
  mainWindow.loadURL(`http://localhost:3000`);
  mainWindow.on("closed", () => {
    app.quit();
  });
}

app.whenReady().then(createWindow);
app.on("window-all-closed", () => {
  app.quit();
});

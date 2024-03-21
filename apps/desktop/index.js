/* eslint-disable turbo/no-undeclared-env-vars */
const { app, BrowserWindow } = require("electron");
const todesktop = require("@todesktop/runtime");

function getRandomPort() {
  return Math.floor(Math.random() * (65535 - 49152 + 1)) + 49152;
}

let hasServerStarted = false;
let totalAttempsLeft = 10;
while (!hasServerStarted && totalAttempsLeft > 0) {
  try {
    process.env.PORT = getRandomPort();
    require("./apps/web/server.js");
    hasServerStarted = true;
  } catch (error) {
    totalAttempsLeft--;
  }
}

todesktop.init();

function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 900,
    title: "Explorer",
    titleBarStyle: "hidden",
    titleBarOverlay: {
      height: 35,
    },
    webPreferences: {
      nodeIntegration: true,
      devTools: true, // !app.isPackaged,
    },
  });

  // and load the index.html of the app.
  mainWindow.loadURL(`http://localhost:${process.env.PORT}`);
  mainWindow.on("closed", () => {
    app.quit();
  });
}

app.whenReady().then(createWindow);
app.on("window-all-closed", () => {
  app.quit();
});

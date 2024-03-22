/* eslint-disable turbo/no-undeclared-env-vars */
const { app, BrowserWindow } = require("electron");
const todesktop = require("@todesktop/runtime");
const log = require("electron-log/main");

log.initialize();
log.transports.ipc.level = "verbose";
Object.assign(console, log.functions);

log.errorHandler.startCatching({
  showDialog: true,
  onError({ error, processType }) {
    if (processType === "renderer") {
      return;
    }

    electron.dialog
      .showMessageBox({
        title: "An error occurred",
        message: error.message,
        detail: error.stack,
        type: "error",
        buttons: ["Ignore", "Exit"],
      })
      .then((result) => {
        if (result.response === 1) {
          electron.app.quit();
        }
      });
  },
});

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

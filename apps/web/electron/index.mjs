/* eslint-disable turbo/no-undeclared-env-vars */
// @ts-check
import { app, BrowserWindow } from "electron";

import "../.next/standalone/apps/web/server.js";

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 900,
    // titleBarStyle: "hidden",
    titleBarOverlay: {
      height: 35,
    },
    vibrancy: "hud",
  });

  mainWindow.loadURL(`http://localhost:3000`);

  // if (!app.isPackaged) {
  //   mainWindow.webContents.openDevTools();
  // }
  mainWindow.on("closed", () => {
    app.quit();
  });
};

app.whenReady().then(() => {
  createWindow();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

import { app, BrowserWindow } from "electron";

app.whenReady().then(() => {
  const mainWindow = new BrowserWindow({
    height: 800,
    width: 600,
  });
  mainWindow.loadURL("http://localhost:3000");
});

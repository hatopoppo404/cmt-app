import { app, BrowserWindow, screen } from "electron";
import path from "node:path";

app.whenReady().then(() => {
  // windowサイズの設定
  const { width: screenWidth, height: screenHeight } =
    screen.getPrimaryDisplay().workAreaSize;
  const windowWidth = 700;
  const windowHeight = Math.min(1200, screenHeight);
  const minHeight = Math.min(400, screenHeight);
  const minWidth = windowWidth;

  // メインウィンドウの定義
  const mainWindow = new BrowserWindow({
    width: windowWidth,
    height: windowHeight,
    minHeight: minHeight,
    minWidth: minWidth,
    title: "cmt-app",
    titleBarStyle: "hidden",

    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });
  mainWindow.loadURL("http://localhost:3000");
});

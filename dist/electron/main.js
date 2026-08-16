"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
electron_1.app.whenReady().then(() => {
    // windowサイズの設定
    const { width: screenWidth, height: screenHeight } = electron_1.screen.getPrimaryDisplay().workAreaSize;
    const windowWidth = 700;
    const windowHeight = Math.min(1200, screenHeight);
    const minHeight = Math.min(400, screenHeight);
    const minWidth = windowWidth;
    // メインウィンドウの定義
    const mainWindow = new electron_1.BrowserWindow({
        width: windowWidth,
        height: windowHeight,
        minHeight: minHeight,
        minWidth: minWidth,
        title: "cmt-app",
        titleBarStyle: "hidden",
    });
    mainWindow.loadURL("http://localhost:3000");
});

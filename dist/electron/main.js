"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const node_path_1 = __importDefault(require("node:path"));
// IPCハンドラの設定
electron_1.ipcMain.handle("ping", () => {
    return "pong";
});
const handleOpenFile = async () => {
    const { canceled, filePaths } = await electron_1.dialog.showOpenDialog({
        properties: ["openFile"],
    });
    if (canceled)
        return null;
    return filePaths[0];
};
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
        webPreferences: {
            preload: node_path_1.default.join(__dirname, "preload.js"),
        },
    });
    mainWindow.loadURL("http://localhost:3000");
    // dialog:openFile
    electron_1.ipcMain.handle("dialog:openFile", handleOpenFile);
});

const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
//关闭警告提示
process.env["ELECTRON_DISABLE_SECURITY_WARNINGS"] = "true";
//是否为macOs
const isMacOS = process.platform == "darwin";
//macOS下是否显示交通灯
const showSysTrafficLight = isMacOS;
//是否为开发环境
const isDevEnv = true;

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 999,
    height: 666,
    minWidth: 999,
    minHeight: 666,
    titleBarStyle: "hidden", //隐藏所有按钮
    transparent: true,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: true,
      webSecurity: false,
    },
  });

  if (isDevEnv) {
    mainWindow.loadURL("http://localhost:5000");
    mainWindow.webContents.openDevTools();
  } else {
  }

  return mainWindow;
};

app.whenReady().then(() => {
  app.mainWin = createWindow();

  app.on("activate", () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
      app.mainWin = createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (!isDevEnv) app.quit();
  if (!isMacOS) app.quit();
});
// 退出
ipcMain.on("app-quit", () => {
  app.quit();
});

// 最小化
ipcMain.on("app-min", () => {
  const win = app.mainWin;
  //win.setFullScreen(false)
  win.minimize();
});

// 最大化
ipcMain.on("app-max", () => {
  const win = app.mainWin;
  if (win.isMaximized()) {
    win.unmaximize();
    //win.setFullScreen(false)
  } else {
    win.maximize();
    //win.setFullScreen(true)
  }
});

const setWindowButtonVisibility = (visible) => {
  if (!isMacOS) return;
  try {
    app.mainWin.setWindowButtonVisibility(showSysTrafficLight && visible);
  } catch (error) {
    console.log(error);
  }
};

ipcMain.on("show-winBtn", () => {
  setWindowButtonVisibility(true);
});

ipcMain.on("hide-winBtn", () => {
  setWindowButtonVisibility(false);
});

const { app, BrowserWindow, ipcMain, Menu, screen } = require("electron");
const path = require("path");
const fs = require("fs");

let mainWindow;


require('electron-reload')(__dirname, {
  electron: path.join(__dirname, 'node_modules', 'electron', 'dist', 'electron.exe'),
});
function createMainWindow() {
  const { width, height } = screen.getPrimaryDisplay().workAreaSize;

  mainWindow = new BrowserWindow({
  
    width: width / 1.25,
    height: height / 1.25,
    resizable: true,
    frame: false,
    webPreferences: {
      preload: path.join(__dirname, './Pages/Test/Test.js'),
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
      nodeIntegrationInWorker: true,
    },
  });

  mainWindow.loadFile("./Pages/MainFixedTesting/Main.html");
  mainWindow.webContents.openDevTools();


}

function createMenu() {
  const customMenu = Menu.buildFromTemplate([]);
  Menu.setApplicationMenu(customMenu);

  const menu = Menu.getApplicationMenu();
  if (menu) {
    const editMenuItem = menu.getMenuItemById("edit");
    if (editMenuItem) {
      editMenuItem.visible = false;
    }
  }
}

function loadSettings() {
  // Check if the settings.json file exists
  if (fs.existsSync("./settings.json")) {
    console.log("Settings file exists");
    // Read from the settings.json file
    fs.readFile("./settings.json", "utf8", (err, data) => {
      if (err) {
        console.error(err);
        return;
      }
      const settings = JSON.parse(data);
      // If the settings.json file contains a value colors then set the colors
      if (settings.colors) {
        const colors = settings.colors;
        for (let key in colors) {
          mainWindow.webContents.executeJavaScript(`
            document.documentElement.style.setProperty("--${key}", "${colors[key]}");
          `);
        }
      }
    });
  } else {
    console.log("Settings file does not exist");
    // Create an empty settings.json file with the colors object
    const defaultSettings = {
      colors: {
        Text: "#b2beb5",
        Background: "#1c1c1c",
        MedGrey: "#708090",
        Background2: "#2c3539",
        Border: "#36454f",
      },
    };
    fs.writeFile("./settings.json", JSON.stringify(defaultSettings), (err) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log("Settings file created with default values");
    });
  }
  // Reload the page
  mainWindow.reload();

  if (fs.existsSync("./Pages/Test/Test.js")) {
    console.log("Test file exists");
  } else {
    console.log("Test file does not exist");
  }


}

app.whenReady().then(() => {
  createMainWindow();
  createMenu();
  loadSettings();
});

app.on("window-all-closed", function () {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

ipcMain.on("close-window", () => {
  mainWindow.close();
  app.quit();
  console.log("Close");
});

ipcMain.on("toggle-maximize", () => {
  console.log("toggle-maximize");
  if (mainWindow.isMaximized()) {
    mainWindow.unmaximize();
  } else {
    mainWindow.maximize();
  }
});

ipcMain.on("minimize-window", () => {
  mainWindow.minimize();
  console.log("minimize");
});
  
ipcMain.on('Test3', function() {
  console.log('Test3 event received from Renderer process');
});


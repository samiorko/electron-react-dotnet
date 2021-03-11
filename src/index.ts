import { app, BrowserWindow } from "electron"
import path from 'path';
import { spawn } from 'child_process';
import { ipcMain } from 'electron';

const exePath = path.resolve('react-background-service/bin/Debug/netcoreapp3.1/react-background-service.exe')

const process = spawn(exePath)



function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true, // this line is very important as it allows us to use `require` syntax in our html file.
    },
  })
  mainWindow.loadFile(`index.html`)

  ipcMain.on('say-hello', (event, name) => {
    process.stdin.write(`${name}\n`)
  })

  process.stdout.on("data", (data: Buffer) => {
    mainWindow.webContents.send("data-from-backend", data.toString());
  })
}

app.on("before-quit", () => {
  process.kill();
});

app.whenReady().then(createWindow)
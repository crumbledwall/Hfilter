import { app, BrowserWindow } from 'electron'
import { release } from 'os'
import { createWindow, winObj } from './window'
import startRouter from './router'
import { ProxyServer, Database } from './common'

const startApp = async() => {
  const connection = await Database.connect()
  await Database.init(connection)
  ProxyServer.getInstance()
  startRouter()
}

// Disable GPU Acceleration for Windows 7
if (release().startsWith('6.1')) app.disableHardwareAcceleration()

// Set application name for Windows 10+ notifications
if (process.platform === 'win32') app.setAppUserModelId(app.getName())

if (!app.requestSingleInstanceLock()) {
  app.quit()
  process.exit(0)
}

let win:winObj = null

app.whenReady().then(() => {
  createWindow(win)
  startApp()
})

app.on('window-all-closed', () => {
  win = null
  if (process.platform !== 'darwin') app.quit()
})

app.on('second-instance', () => {
  if (win) {
    // Focus on the main window if the user tried to open another
    if (win.isMinimized()) win.restore()
    win.focus()
  }
})

app.on('activate', () => {
  const allWindows = BrowserWindow.getAllWindows()
  if (allWindows.length) {
    allWindows[0].focus()
  } else {
    createWindow(win)
    startApp()
  }
})

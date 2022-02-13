import { ipcMain } from 'electron'
import { mainHandler } from '../handlers/main'

export default function mainRouter() {
  ipcMain.on('sumbit', (event, arg) => {
    console.log(arg)
    event.sender.send('reply', mainHandler)
  })
}

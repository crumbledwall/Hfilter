import { ipcMain } from 'electron'

export default function ipcResponse(requestChannel: string,
  responseChannel: string, handler: (arg: any) => any) {
  ipcMain.on(requestChannel, (event, arg) => {
    event.reply(responseChannel, handler(arg))
  })
}

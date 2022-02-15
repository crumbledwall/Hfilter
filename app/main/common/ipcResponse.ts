import { ipcMain } from 'electron'

export default function ipcResponse(channelName: string,
  handler: (arg: any) => any) {
  ipcMain.on(channelName, (event, arg) => {
    event.reply(channelName, handler(arg))
  })
}

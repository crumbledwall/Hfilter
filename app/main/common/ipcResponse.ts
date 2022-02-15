import { ipcMain } from 'electron'

export default function ipcResponse(channelName: string,
  handler: (arg: any) => any) {
  ipcMain.on(`${channelName}Req`, (event, arg) => {
    event.reply(`${channelName}Res`, handler(arg))
  })
}

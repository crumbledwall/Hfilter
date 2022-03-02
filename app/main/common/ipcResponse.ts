import { ipcMain } from 'electron'

export function ipcResponse(channelName: string,
  handler: (arg: any) => any) {
  ipcMain.on(channelName, (event, arg) => {
    event.reply(channelName, handler(arg))
  })
}

export async function ipcResponseSync(channelName: string,
  handler: (arg: any) => any) {
  ipcMain.on(channelName, (event, arg) => {
    handler(arg).then((data: any) => {
      event.reply(channelName, data)
    }).catch((err: any) => {
      event.reply(channelName, err)
    })
  })
}

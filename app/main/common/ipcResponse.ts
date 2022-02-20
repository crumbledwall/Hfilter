import { ipcMain } from 'electron'

export function ipcResponse(channelName: string,
  handler: (arg: any) => any) {
  ipcMain.on(channelName, (event, arg) => {
    event.reply(channelName, handler(arg))
  })
}

export async function ipcResponseSync(channelName: string,
  handler: (arg: any) => any) {
  ipcMain.on(channelName, async(event, arg) => {
    console.log('debug', await handler(arg))
    event.reply(channelName, await handler(arg))
  })
}

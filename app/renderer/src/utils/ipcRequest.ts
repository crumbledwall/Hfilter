export default function ipcRequest<T>(channelName: string, data: any) {
  return new Promise<T>((resolve) => {
    window.ipcRenderer.send(`${channelName}Req`, data)
    window.ipcRenderer.on(`${channelName}Res`, (event, arg: T) => {
      resolve(arg)
    })
  })
}

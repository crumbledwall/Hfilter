export default function ipcRequest<T>(channelName: string, data: any) {
  return new Promise<T>((resolve) => {
    window.ipcRenderer.send(channelName, data)
    window.ipcRenderer.on(channelName, (event, arg: T) => {
      resolve(arg)
    })
  })
}

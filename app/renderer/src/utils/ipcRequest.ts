export default function ipcRequest<T>(channelName: string, data: any) {
  return new Promise<T>((resolve) => {
    console.log('debug function', data)
    window.ipcRenderer.send(channelName, data)
    window.ipcRenderer.on(channelName, (event, arg: T) => {
      resolve(arg)
    })
  })
}

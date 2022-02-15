export default function ipcRequest<T>(requestChannel: string,
  responseChannel: string, data: any) {
  return new Promise<T>((resolve) => {
    window.ipcRenderer.send(requestChannel, data)
    window.ipcRenderer.on(responseChannel, (event, arg: T) => {
      resolve(arg)
    })
  })
}

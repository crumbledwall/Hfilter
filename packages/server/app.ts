import express from 'express'

const app: express.Express = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req: express.Request, res: express.Response) => {
  res.send('hello world')
})

export function startServer() {
  app.listen(3000)
}


import express from 'express'
import http from 'http'
import bodyParser from 'body-parser'
import cors from 'cors'

const db: Record<string, any> = {
  users: [
    { id: '01', name: 'Thomas', surname: 'Edison', addresses: [{ type: 'home' }] },
    { id: '02', name: 'Marie', surname: 'Curie', addresses: [] },
  ]
}



//  `${new Date().getMilliseconds()}`
//  `${Math.random() * 1000000000}`

// fetch({
//   url: 'http://localhost:8081/users/create',
//   body: JSON.stringify({
//     id: `${Math.random() * 1000000000}`,
//     name: '',
//     surname: ''
//     addresses: []
//   }),
//   method: 'POST'
// })

const main = async () => {
  const {
    app
  } = createServer()
  Object.keys(db).forEach((key) => {
    app.get(`/${key}`, (req, res) => {
      res.send(db[key])
    })
    app.post(`/${key}/create`, (req, res) => {
      db[key].push(req.body)
      res.send(db[key])
    })
    app.post(`/${key}/update`, (req, res) => {
      const newValue = req.body
      const oldValue = db[key].find((value: any) => value.id === newValue.id)
      Object.keys(newValue).forEach((fieldKey: string) =>{
        oldValue[fieldKey] = newValue[fieldKey]
      })
      res.send(db[key])
    })
    app.get(`/${key}/delete`, (req, res) => {
      db[key] = db[key].filter((value: any) => value.id !== req.query.id)
      res.send(db[key])
    })
  })
}

const createServer = () => {
  // const IS_DEV = process.env.NODE_ENV !== 'production'
  // Config

  const PORT = process.env.PORT ?? 8081
  const configurations = {
  // Note: You may need sudo to run on port 443
    production: { ssl: false, port: PORT, hostname: 'example.com' },
    development: { ssl: false, port: PORT, hostname: 'localhost' },
  } as const
  const environment = (process.env.NODE_ENV ?? 'development') as 'production'|'development'
  const config = configurations[environment]


  // Express Config
  // Create a web server to serve files
  const app = express()
  // app.use(express.static('static'))
  // app.use(cors({origin: '*'}))
  app.use(cors())
  app.use(bodyParser.json())

  app.get('/', (req, res) => {
    res.send('ok')
  })

  // Create the HTTPS or HTTP server, per configuration
  const server = http.createServer(app)
  // if (config.ssl) {
  // // Assumes certificates are in .ssl folder from package root. Make sure the files
  // // are secured.
  //   server = https.createServer(
  //     {
  //       key: fs.readFileSync(`./ssl/${environment}/server.key`),
  //       cert: fs.readFileSync(`./ssl/${environment}/server.crt`),
  //     },
  //     app,
  //   )
  // } else {
  //   server = http.createServer(app)
  // }
  server.listen({
    port: config.port,
  }, () => console.log(
    '🚀 Server ready at',
    `http${config.ssl ? 's' : ''}://${config.hostname}:${config.port} `,
  ))
  return {
    server,
    app
  }
}
main().catch((e) => console.error(e))
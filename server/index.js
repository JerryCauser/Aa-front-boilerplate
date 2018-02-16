require('isomorphic-unfetch')
const express = require('express')
const next = require('next')
const compression = require('compression')
const helmet = require('helmet')
const cors = require('cors')

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({dev})
const handle = app.getRequestHandler()
const renderAndCache = require('./cache')(app)
const router = require('./routes')({handle, renderAndCache})

app.prepare()
  .then(() => {
    const server = express()
    
    server.use(compression())
    server.use(helmet())
    server.use(cors())
    server.use(router)
    
    server.listen(port, (err) => {
      if (err) throw err
      console.log(`> Ready on http://localhost:${port}`)
    })
  })

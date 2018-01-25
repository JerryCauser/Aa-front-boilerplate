require('isomorphic-unfetch')
const express = require('express')
const next = require('next')
const compression = require('compression')
const helmet = require('helmet')

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({dev})
const handle = app.getRequestHandler()
const renderAndCache = require('./cache')(app)

app.prepare()
  .then(() => {
    const server = express()
    
    server.use(compression())
    server.use(helmet())
    server.disable('x-powered-by')
    
    server.get('/', (req, res) => {
      renderAndCache({
        req, res,
        path: '/'
      })
    })
  
    server.get('/blog/:id', (req, res) => {
      renderAndCache({
        req, res,
        path:'/blog',
        params: {id: req.params.id}
      })
    })
  
    server.get('/timeout/:ms', (req, res) => {
      renderAndCache({
        req, res,
        path: '/timeout',
        params: { ms: req.params.ms }
      })
    })
    
    server.get('/github/:user', (req, res) => {
      renderAndCache({
        req, res,
        path:'/github',
        params:{user: req.params.user}
      })
    })
    
    server.get('*', (req, res) => {
      return handle(req, res)
    })
    
    server.listen(port, (err) => {
      if (err) throw err
      console.log(`> Ready on http://localhost:${port}`)
    })
  })

const router = require('express').Router()
const apiRoutes = require('./api')

function getRoutes({handle, renderAndCache}) {
  router.get('/status', (req, res) => res.send('OK'))
  
  router.use('/api', apiRoutes)
  router.use('/api/*', (err, req, res) => {
    if (err) res.status(400).json(err)
  })
  
  router.get('/', (req, res) => {
    renderAndCache({
      req, res,
      path: '/'
    })
  })
  
  router.get('/blog/:id', (req, res) => {
    renderAndCache({
      req, res,
      path:'/blog',
      params: {id: req.params.id}
    })
  })
  
  router.get('/timeout/:ms', (req, res) => {
    renderAndCache({
      req, res,
      path: '/timeout',
      params: { ms: req.params.ms }
    })
  })
  
  router.get('/github/:user', (req, res) => {
    renderAndCache({
      req, res,
      path:'/github',
      params:{user: req.params.user}
    })
  })

  router.get('*', (req, res) => {
    return handle(req, res)
  })
  
  return router
}

module.exports = getRoutes
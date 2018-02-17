const LRUCache = require('lru-cache')

const ssrCache = new LRUCache({
  max: 100,
  maxAge: 1000 * 60 * 60 * 24// 24 hours
})

module.exports = app => {
  return ({req, res, path, params}) => {
    const key = `${req.url}`
    
    // If we have a page in the cache, let's serve it
    if (ssrCache.has(key)) {
      res.setHeader('x-cache', 'HIT')
      res.send(ssrCache.get(key))
      return
    }
  
    app.renderToHTML(req, res, path, params)
      .then(html => {
        if (res.statusCode !== 200) {
          res.send(html)
          return
        }
      
        ssrCache.set(key, html)
      
        res.setHeader('x-cache', 'MISS')
        res.send(html)
      })
      .catch(err => {
        app.renderError(err, req, res, path, params)
      
      })
  }
}

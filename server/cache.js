const LRUCache = require('lru-cache')

const ssrCache = new LRUCache({
  max: 100,
  maxAge: 1000 * 60 * 60 * 24// 24 hours
})

module.exports = (app) => {
  return ({req, res, path, params}) => {
    const key = `${req.url}`
    
    // If we have a page in the cache, let's serve it
    if (ssrCache.has(key)) {
      // console.log(`CACHE HIT: ${key}`)
      res.send(ssrCache.get(key))
      return
    }
    
    // If not let's render the page into HTML
    app.renderToHTML(req, res, path, params)
      .then((html) => {
        // Let's cache this page
        // console.log(`CACHE MISS: ${key}`)
        ssrCache.set(key, html)
        
        res.send(html)
      })
      .catch((err) => {
        app.renderError(err, req, res, path, params)
      })
  }
}
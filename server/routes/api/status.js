const router = require('express').Router()
const bodyParser = require('body-parser')//use body-parser only in routes, not in middleware

router
  .route('/')
  .post(bodyParser.json(), (req, res) => {
    res.status(200)
    res.json({'status': 'ok'})
  })
  .put(bodyParser.json(), (req, res) => {
    res.status(200)
    res.json({'status': 'ok'})
  })
  .get(bodyParser.urlencoded({ extended: true }), (req, res) => {
    res.status(200)
    res.json({'status': 'ok'})
  })
  .delete(bodyParser.urlencoded({ extended: true }), (req, res) => {
    res.status(200)
    res.json({'status': 'ok'})
  })

module.exports = router

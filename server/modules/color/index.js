const Router = require('koa-trie-router')
const data = require('./routes/data')

const router = new Router()

module.exports = () => {
  router.get(data())

  return router.middleware()
}

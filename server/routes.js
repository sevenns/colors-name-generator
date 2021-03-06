const Router = require('koa-trie-router')
const mount = require('koa-mount')

const color = require('./modules/color')

const router = new Router()

module.exports = () => {
  router.use(mount('/color', color()))

  return router.middleware()
}

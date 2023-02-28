const Router = require('express')
const router = new Router()
const musicRouter = require('./musicRouter')

router.use('/music', musicRouter)

module.exports=router
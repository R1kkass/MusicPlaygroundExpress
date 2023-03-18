const Router = require('express')
const router = new Router()
const musicRouter = require('./musicRouter')
const albumRouter = require('./albumRouter')

router.use('/music', musicRouter)
router.use('/album', albumRouter)

module.exports=router
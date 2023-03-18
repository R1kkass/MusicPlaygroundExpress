const albumController = require("../controller/albumController");
const Router = require('express')
const router = new Router()

router.get('/getone', albumController.getOne)
router.get('/getall', albumController.getAll)

module.exports=router
const musicController = require("../controller/musicController");
const Router = require('express')
const router = new Router()

router.post('/create', musicController.addMusic)
router.get('/getAll', musicController.getAllMusic)

module.exports=router
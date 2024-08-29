const express = require('express');
const router = express.Router();
const middleware = require('../middleware')
//middleware.checkToken

const controller = require('../controllers/mix_controller');

router.get('/list', middleware.checkToken, controller.getEverythingMobile);
router.get('/mainpage/:idcidade', middleware.checkToken, controller.mainPage);


module.exports = router;
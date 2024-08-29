const express = require('express');
const router = express.Router();
const middleware = require('../middleware')
//middleware.checkToken

const controller = require('../controllers/mix_controller');

router.get('/list', controller.getEverythingMobile);
router.get('/mainpage/:idcidade', controller.mainPage);


module.exports = router;
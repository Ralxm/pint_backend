const express = require('express');
const router = express.Router();

const controller = require('../controllers/mix_controller');

router.get('/list', controller.getEverythingMobile);


module.exports = router;
const express = require('express');
const router = express.Router();
const middleware = require('../middleware')

const controller = require('../controllers/cidade_controller');

router.post('/create', middleware.checkToken, controller.cidadeCreate);
router.get('/list', middleware.checkToken, controller.cidadeList);
router.get('/get/:id', middleware.checkToken, controller.cidadeGet);
router.put('/delete/:id', middleware.checkToken, controller.cidadeDelete);
router.put('/update/:id', middleware.checkToken, controller.cidadeUpdate);

module.exports = router;
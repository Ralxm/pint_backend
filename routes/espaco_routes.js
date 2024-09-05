const express = require('express');
const router = express.Router();
const middleware = require('../middleware')

const controller = require('../controllers/espaco_controller');

router.post('/create', middleware.checkToken, controller.espacoCreate);
router.get('/list', middleware.checkToken, controller.espacoList);
router.get('/get/:id', middleware.checkToken, controller.espacoGet);
router.put('/delete/:id', middleware.checkToken, controller.espacoDelete);
router.put('/update/:id', middleware.checkToken, controller.espacoUpdate);

module.exports = router;
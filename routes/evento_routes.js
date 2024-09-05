const express = require('express');
const router = express.Router();
const middleware = require('../middleware')

const controller = require('../controllers/evento_controller');

router.post('/create', middleware.checkToken, controller.eventoCreate);
router.get('/list', middleware.checkToken, controller.eventoList);
router.get('/get/:id', middleware.checkToken, controller.eventoGet);
router.put('/delete/:id', middleware.checkToken, controller.eventoDelete);
router.put('/update/:id', middleware.checkToken, controller.eventoUpdate);
router.post('/updateEstado/:id', middleware.checkToken, controller.updateEstado);

module.exports = router;
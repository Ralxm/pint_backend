const express = require('express');
const router = express.Router();

const controller = require('../controllers/evento_controller');

router.post('/create', controller.eventoCreate);
router.get('/list', controller.eventoList);
router.get('/get/:id', controller.eventoGet);
router.put('/delete/:id', controller.eventoDelete);
router.put('/update/:id', controller.eventoUpdate);

module.exports = router;
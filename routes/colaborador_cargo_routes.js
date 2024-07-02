const express = require('express');
const router = express.Router();

const controller = require('../controllers/colaborador_cargo_controller');

router.post('/create', controller.colaboradorCargoCreate);
router.get('/list', controller.colaboradorCargoList);
router.get('/get/:id', controller.colaboradorCargoGet);
router.get('/getByColaborador/:id', controller.colaboradorCargoGetByColaborador);
router.put('/delete/:id', controller.colaboradorCargoDelete);
router.put('/update/:id', controller.colaboradorCargoUpdate);

module.exports = router;
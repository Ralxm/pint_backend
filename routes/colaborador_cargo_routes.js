const express = require('express');
const router = express.Router();
const middleware = require('../middleware')

const controller = require('../controllers/colaborador_cargo_controller');

router.post('/create', middleware.checkToken, controller.colaboradorCargoCreate);
router.get('/list', middleware.checkToken, controller.colaboradorCargoList);
router.get('/get/:id', middleware.checkToken, controller.colaboradorCargoGet);
router.get('/getByColaborador/:id', middleware.checkToken, controller.colaboradorCargoGetByColaborador);
router.put('/delete/:id', middleware.checkToken, controller.colaboradorCargoDelete);
router.put('/update/:id', middleware.checkToken, controller.colaboradorCargoUpdate);

module.exports = router;
const express = require('express');
const router = express.Router();
const middleware = require('../middleware')

const controller = require('../controllers/cargo_permissao_controller');

router.post('/create', middleware.checkToken, controller.cargoPermissaoCreate);
router.get('/list', middleware.checkToken, controller.cargoPermissaoList);
router.get('/get/:id', middleware.checkToken, controller.cargoPermissaoGet);
router.put('/delete/:id', middleware.checkToken, controller.cargoPermissaoDelete);
router.put('/update/:id', middleware.checkToken, controller.cargoPermissaoUpdate);

module.exports = router;
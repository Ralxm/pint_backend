const express = require('express');
const router = express.Router();

const controller = require('../controllers/cargo_permissao_controller');

router.post('/create', controller.cargoPermissaoCreate);
router.get('/list', controller.cargoPermissaoList);
router.get('/get/:id', controller.cargoPermissaoGet);
router.put('/delete/:id', controller.cargoPermissaoDelete);
router.put('/update/:id', controller.cargoPermissaoUpdate);

module.exports = router;
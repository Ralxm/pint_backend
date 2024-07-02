const express = require('express');
const router = express.Router();

const controller = require('../controllers/edicao_publicacao_controller');

router.post('/create', controller.edicaoPublicacaoCreate);
router.get('/list', controller.edicaoPublicacaoList);
router.get('/get/:id', controller.edicaoPublicacaoGet);
router.put('/delete/:id', controller.edicaoPublicacaoDelete);
router.put('/update/:id', controller.edicaoPublicacaoUpdate);

module.exports = router;
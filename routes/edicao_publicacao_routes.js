const express = require('express');
const router = express.Router();
const middleware = require('../middleware')

const controller = require('../controllers/edicao_publicacao_controller');

router.post('/create', middleware.checkToken, controller.edicaoPublicacaoCreate);
router.get('/list', middleware.checkToken, controller.edicaoPublicacaoList);
router.get('/get/:id', middleware.checkToken, controller.edicaoPublicacaoGet);
router.put('/delete/:id', middleware.checkToken, controller.edicaoPublicacaoDelete);
router.put('/update/:id', middleware.checkToken, controller.edicaoPublicacaoUpdate);

module.exports = router;
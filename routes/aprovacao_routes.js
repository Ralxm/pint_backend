const express = require('express');
const router = express.Router();
const middleware = require('../middleware')

const controller = require('../controllers/aprovacao_controller');

router.post('/create', middleware.checkToken, controller.aprovacaoCreate);
router.get('/list', middleware.checkToken, controller.aprovacaoList);
router.get('/get/:id', middleware.checkToken, controller.aprovacaoGet);
router.put('/delete/:id', middleware.checkToken, controller.aprovacaoDelete);
router.put('/update/:id', middleware.checkToken, controller.aprovacaoUpdate);

module.exports = router;

const express = require('express');
const router = express.Router();

const controller = require('../controllers/aprovacao_controller');

router.post('/create', controller.aprovacaoCreate);
router.get('/list', controller.aprovacaoList);
router.get('/get/:id', controller.aprovacaoGet);
router.put('/delete/:id', controller.aprovacaoDelete);
router.put('/update/:id', controller.aprovacaoUpdate);

module.exports = router;

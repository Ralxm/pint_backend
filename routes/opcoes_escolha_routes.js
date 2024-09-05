const express = require('express');
const router = express.Router();

const controller = require('../controllers/opcoes_escolha_controller');

router.post('/create', controller.opcaoEscolhaCreate);
router.get('/list', controller.opcaoEscolhaList);
router.get('/get/:id', controller.opcaoEscolhaGet);
router.put('/delete/:id', controller.opcaoEscolhaDelete);
router.put('/update/:id', controller.opcaoEscolhaUpdate);
router.get('/listByQuestionario/:id', controller.opcaoEscolhaFindByQuestionario);

module.exports = router;
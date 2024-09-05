const express = require('express');
const router = express.Router();
const middleware = require('../middleware')

const controller = require('../controllers/opcoes_escolha_controller');

router.post('/create', middleware.checkToken, controller.opcaoEscolhaCreate);
router.get('/list', middleware.checkToken, controller.opcaoEscolhaList);
router.get('/get/:id', middleware.checkToken, controller.opcaoEscolhaGet);
router.put('/delete/:id', middleware.checkToken, controller.opcaoEscolhaDelete);
router.put('/update/:id', middleware.checkToken, controller.opcaoEscolhaUpdate);
router.get('/listByQuestionario/:id', middleware.checkToken, controller.opcaoEscolhaFindByQuestionario);

module.exports = router;
const express = require('express');
const router = express.Router();
const middleware = require('../middleware')

const controller = require('../controllers/edicao_comentario_controller');

router.post('/create', middleware.checkToken, controller.edicaoComentarioCreate);
router.get('/list', middleware.checkToken, controller.edicaoComentarioList);
router.get('/get/:id', middleware.checkToken, controller.edicaoComentarioGet);
router.put('/delete/:id', middleware.checkToken, controller.edicaoComentarioDelete);
router.put('/update/:id', middleware.checkToken, controller.edicaoComentarioUpdate);

module.exports = router;
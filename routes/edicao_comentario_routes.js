const express = require('express');
const router = express.Router();

const controller = require('../controllers/edicao_comentario_controller');

router.post('/create', controller.edicaoComentarioCreate);
router.get('/list', controller.edicaoComentarioList);
router.get('/get/:id', controller.edicaoComentarioGet);
router.put('/delete/:id', controller.edicaoComentarioDelete);
router.put('/update/:id', controller.edicaoComentarioUpdate);

module.exports = router;
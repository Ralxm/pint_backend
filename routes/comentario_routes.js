const express = require('express');
const router = express.Router();

const controller = require('../controllers/comentario_controller');

router.post('/create', controller.comentarioCreate);
router.get('/list', controller.comentarioList);
router.get('/get/:id', controller.comentarioGet);
router.put('/delete/:id', controller.comentarioDelete);
router.put('/update/:id', controller.comentarioUpdate);
router.get('/listByPost/:id', controller.comentariosPorPublicacao);

module.exports = router;
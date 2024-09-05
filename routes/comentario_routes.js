const express = require('express');
const router = express.Router();
const middleware = require('../middleware')

const controller = require('../controllers/comentario_controller');

router.post('/create', middleware.checkToken, controller.comentarioCreate);
router.get('/list', middleware.checkToken, controller.comentarioList);
router.get('/get/:id', middleware.checkToken, controller.comentarioGet);
router.put('/delete/:id', middleware.checkToken, controller.comentarioDelete);
router.put('/update/:id', middleware.checkToken, controller.comentarioUpdate);
router.get('/listByPost/:id', middleware.checkToken, controller.comentariosPorPublicacao);

module.exports = router;
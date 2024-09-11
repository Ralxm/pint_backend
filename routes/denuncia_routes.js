const express = require('express');
const router = express.Router();

const controller = require('../controllers/denuncia_controller');

router.post('/create', controller.denunciaCreate);
router.get('/list', controller.denunciaList);
router.get('/get/:id', controller.denunciaGet);
router.put('/delete/:id', controller.denunciaDelete);
router.put('/update/:id', controller.denunciaUpdate);
router.get('/listByCidade/:id', controller.denunciaListByCidade);
router.put('/deleteByComentario/:id', controller.denunciaDeleteByComentario);

module.exports = router;
const express = require('express');
const router = express.Router();

const controller = require('../controllers/subcategoria_controller');

router.post('/create', controller.subcategoriaCreate);
router.get('/list', controller.subcategoriaList);
router.get('/listbyid/:id', controller.subcategoriaListByID);
router.get('/get/:id', controller.subcategoriaGet);
router.put('/delete/:id', controller.subcategoriaDelete);
router.put('/update/:id', controller.subcategoriaUpdate);

module.exports = router;
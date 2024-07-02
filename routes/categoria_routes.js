const express = require('express');
const router = express.Router();

const controller = require('../controllers/categoria_controller');

router.post('/create', controller.categoriaCreate);
router.get('/list', controller.categoriaList);
router.get('/get/:id', controller.categoriaGet);
router.put('/delete/:id', controller.categoriaDelete);
router.put('/update/:id', controller.categoriaUpdate);

module.exports = router;
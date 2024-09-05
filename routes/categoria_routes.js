const express = require('express');
const router = express.Router();
const middleware = require('../middleware')

const controller = require('../controllers/categoria_controller');

router.post('/create', middleware.checkToken, controller.categoriaCreate);
router.get('/list', middleware.checkToken, controller.categoriaList);
router.get('/get/:id', middleware.checkToken, controller.categoriaGet);
router.put('/delete/:id', middleware.checkToken, controller.categoriaDelete);
router.put('/update/:id', middleware.checkToken, controller.categoriaUpdate);

module.exports = router;
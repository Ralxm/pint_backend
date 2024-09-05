const express = require('express');
const router = express.Router();
const middleware = require('../middleware')

const controller = require('../controllers/subcategoria_controller');

router.post('/create', middleware.checkToken, controller.subcategoriaCreate);
router.get('/list', middleware.checkToken, controller.subcategoriaList);
router.get('/listbyid/:id', middleware.checkToken, controller.subcategoriaListByID);
router.get('/get/:id', middleware.checkToken, controller.subcategoriaGet);
router.put('/delete/:id', middleware.checkToken, controller.subcategoriaDelete);
router.put('/update/:id', middleware.checkToken, controller.subcategoriaUpdate);

module.exports = router;
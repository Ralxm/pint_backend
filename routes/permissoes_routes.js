const express = require('express');
const router = express.Router();
const middleware = require('../middleware')

const controller = require('../controllers/permissoes_controller');

router.post('/create', middleware.checkToken, controller.permissoesCreate);
router.get('/list', middleware.checkToken, controller.permissoesList);
router.get('/get/:id', middleware.checkToken, controller.permissoesGet);
router.put('/delete/:id', middleware.checkToken, controller.permissoesDelete);
router.put('/update/:id', middleware.checkToken, controller.permissoesUpdate);

module.exports = router;
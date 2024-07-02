const express = require('express');
const router = express.Router();

const controller = require('../controllers/permissoes_controller');

router.post('/create', controller.permissoesCreate);
router.get('/list', controller.permissoesList);
router.get('/get/:id', controller.permissoesGet);
router.put('/delete/:id', controller.permissoesDelete);
router.put('/update/:id', controller.permissoesUpdate);

module.exports = router;
const express = require('express');
const router = express.Router();

const controller = require('../controllers/voto_controller');

router.post('/create', controller.votoCreate);
router.get('/list', controller.votoList);
router.get('/get/:id', controller.votoGet);
router.put('/delete/:id', controller.votoDelete);
router.put('/update/:id', controller.votoUpdate);
router.get('/getByOpcao/:id', controller.votoGetByOpcao);

module.exports = router;
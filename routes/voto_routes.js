const express = require('express');
const router = express.Router();
const middleware = require('../middleware')

const controller = require('../controllers/voto_controller');

router.post('/create', middleware.checkToken, controller.votoCreate);
router.get('/list', middleware.checkToken, controller.votoList);
router.get('/get/:id', middleware.checkToken, controller.votoGet);
router.put('/delete/:id', middleware.checkToken, controller.votoDelete);
router.put('/update/:id', middleware.checkToken, controller.votoUpdate);
router.get('/getByOpcao/:id', middleware.checkToken, controller.votoGetByOpcao);

module.exports = router;
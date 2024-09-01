const express = require('express');
const router = express.Router();
const middleware = require('../middleware')

const controller = require('../controllers/colaborador_controller');

router.post('/login', controller.colaboradorLogin);
router.post('/create', controller.colaboradorCreate);
router.get('/list', middleware.checkToken, controller.colaboradorList);
router.get('/get/:id', middleware.checkToken, controller.colaboradorGet);
router.put('/delete/:id', middleware.checkToken, controller.colaboradorDelete);
router.put('/update/:id', middleware.checkToken, controller.colaboradorUpdate);
router.put('/setImage/:id', middleware.checkToken, controller.colaboradorSetImagem);
router.post('/updatePassword/:id', middleware.checkToken, controller.updatePassword);
router.post('/updateAtivo/:id', middleware.checkToken, controller.updateAtivo);
router.post('/updateMudouPassword/:id', middleware.checkToken, controller.updateMudouPassowrd);

router.get('/getByEmail/:email', controller.colaboradorGetByEmail);

module.exports = router;
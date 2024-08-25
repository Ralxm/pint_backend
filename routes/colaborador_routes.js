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
router.put('/updatePassword/:id', middleware.checkToken, controller.updatePassword);

router.put('/getByEmail/:email', middleware.checkToken, controller.colaboradorGetByEmail);

module.exports = router;
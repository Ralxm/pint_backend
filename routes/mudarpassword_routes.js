const express = require('express');
const router = express.Router();
const middleware = require('../middleware')

const controller = require('../controllers/mudarpassword_controller');

router.post('/create', middleware.checkToken, controller.mudarPasswordCreate);
router.get('/list', middleware.checkToken, controller.mudarPasswordList);
router.get('/get/:id', middleware.checkToken, controller.mudarPasswordGet);
router.put('/delete/:id', middleware.checkToken, controller.mudarPasswordDelete);
router.put('/update/:id', middleware.checkToken, controller.mudarPasswordUpdate);


module.exports = router;
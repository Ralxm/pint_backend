const express = require('express');
const router = express.Router();

const controller = require('../controllers/aviso_controller');

router.post('/create', controller.mudarPasswordCreate);
router.get('/list', controller.mudarPasswordList);
router.get('/get/:id', controller.mudarPasswordGet);
router.put('/delete/:id', controller.mudarPasswordDelete);
router.put('/update/:id', controller.mudarPasswordUpdate);


module.exports = router;
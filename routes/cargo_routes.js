const express = require('express');
const router = express.Router();
const middleware = require('../middleware')

const controller = require('../controllers/cargo_controller');

router.post('/create', middleware.checkToken, controller.cargoCreate);
router.get('/list', middleware.checkToken, controller.cargoList);
router.get('/get/:id', middleware.checkToken, controller.cargoGet);
router.put('/delete/:id', middleware.checkToken, controller.cargoDelete);
router.put('/update/:id', middleware.checkToken, controller.cargoUpdate);

module.exports = router;
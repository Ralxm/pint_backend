const express = require('express');
const router = express.Router();

const controller = require('../controllers/cargo_controller');

router.post('/create', controller.cargoCreate);
router.get('/list', controller.cargoList);
router.get('/get/:id', controller.cargoGet);
router.put('/delete/:id', controller.cargoDelete);
router.put('/update/:id', controller.cargoUpdate);

module.exports = router;
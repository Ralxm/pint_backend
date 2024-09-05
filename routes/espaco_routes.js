const express = require('express');
const router = express.Router();

const controller = require('../controllers/espaco_controller');

router.post('/create', controller.espacoCreate);
router.get('/list', controller.espacoList);
router.get('/get/:id', controller.espacoGet);
router.put('/delete/:id', controller.espacoDelete);
router.put('/update/:id', controller.espacoUpdate);

module.exports = router;
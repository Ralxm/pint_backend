const express = require('express');
const router = express.Router();

const controller = require('../controllers/cidade_controller');

router.post('/create', controller.cidadeCreate);
router.get('/list', controller.cidadeList);
router.get('/get/:id', controller.cidadeGet);
router.put('/delete/:id', controller.cidadeDelete);
router.put('/update/:id', controller.cidadeUpdate);

module.exports = router;
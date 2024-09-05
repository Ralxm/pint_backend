const express = require('express');
const router = express.Router();

const controller = require('../controllers/questionario_controller');

router.post('/create', controller.questionarioCreate);
router.get('/list', controller.questionarioList);
router.get('/get/:id', controller.questionarioGet);
router.put('/delete/:id', controller.questionarioDelete);
router.put('/update/:id', controller.questionarioUpdate);

module.exports = router;
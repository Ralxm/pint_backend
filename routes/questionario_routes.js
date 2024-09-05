const express = require('express');
const router = express.Router();
const middleware = require('../middleware')

const controller = require('../controllers/questionario_controller');

router.post('/create', middleware.checkToken, controller.questionarioCreate);
router.get('/list', middleware.checkToken, controller.questionarioList);
router.get('/get/:id', middleware.checkToken, controller.questionarioGet);
router.put('/delete/:id', middleware.checkToken, controller.questionarioDelete);
router.put('/update/:id', middleware.checkToken, controller.questionarioUpdate);

module.exports = router;
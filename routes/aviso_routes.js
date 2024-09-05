const express = require('express');
const router = express.Router();
const middleware = require('../middleware')

const controller = require('../controllers/aviso_controller');

router.post('/create', middleware.checkToken, controller.avisoCreate);
router.get('/list', middleware.checkToken, controller.avisoList);
router.get('/get/:id', middleware.checkToken, controller.avisoGet);
router.put('/delete/:id', middleware.checkToken, controller.avisoDelete);
router.put('/update/:id', middleware.checkToken, controller.avisoUpdate);


module.exports = router;
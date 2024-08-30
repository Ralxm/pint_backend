const express = require('express');
const router = express.Router();

const controller = require('../controllers/post_controller');

router.post('/create', controller.avisoCreate);
router.get('/list', controller.avisoList);
router.get('/get/:id', controller.avisoGet);
router.put('/delete/:id', controller.avisoDelete);
router.put('/update/:id', controller.avisoUpdate);


module.exports = router;
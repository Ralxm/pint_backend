const express = require('express');
const router = express.Router();

const controller = require('../controllers/post_controller');

router.post('/create', controller.postCreate);
router.get('/list', controller.postList);
router.get('/get/:id', controller.postGet);
router.put('/delete/:id', controller.postDelete);
router.put('/update/:id', controller.postUpdate);

router.get('/listByCidade/:id', controller.postListByCidad);

module.exports = router;
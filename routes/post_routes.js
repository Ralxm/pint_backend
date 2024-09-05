const express = require('express');
const router = express.Router();
const middleware = require('../middleware')

const controller = require('../controllers/post_controller');

router.post('/create', middleware.checkToken, controller.postCreate);
router.get('/list', middleware.checkToken, controller.postList);
router.get('/listBlob/:id', middleware.checkToken, controller.postListBlob);
router.get('/get/:id', middleware.checkToken, controller.postGet);
router.put('/delete/:id', middleware.checkToken, controller.postDelete);
router.put('/update/:id', middleware.checkToken, controller.postUpdate);
router.put('/view/:id', middleware.checkToken, controller.increaseViewCount);
router.put('/updateRating/:id', middleware.checkToken, controller.setRating);
router.post('/adminUpdate/:id', middleware.checkToken, controller.adminUpdate);
router.post('/ultimaAtividade/:id', middleware.checkToken, controller.ultimaAtividadeUpdate);
router.get('/topViews', middleware.checkToken, controller.topViews);

router.get('/listByCidade/:id', middleware.checkToken, controller.postListByCidade);

module.exports = router;
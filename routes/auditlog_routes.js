const express = require('express');
const router = express.Router();
const middleware = require('../middleware')

const controller = require('../controllers/auditlog_controller');

router.post('/create', middleware.checkToken, controller.auditlogCreate);
router.get('/list', middleware.checkToken, controller.auditlogList);
router.get('/get/:id', middleware.checkToken, controller.auditlogGet);
router.put('/delete/:id', middleware.checkToken, controller.auditlogDelete);
router.put('/update/:id', middleware.checkToken, controller.auditlogUpdate);

module.exports = router;
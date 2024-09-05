const express = require('express');
const router = express.Router();

const controller = require('../controllers/auditlog_controller');

router.post('/create', controller.auditlogCreate);
router.get('/list', controller.auditlogList);
router.get('/get/:id', controller.auditlogGet);
router.put('/delete/:id', controller.auditlogDelete);
router.put('/update/:id', controller.auditlogUpdate);

module.exports = router;
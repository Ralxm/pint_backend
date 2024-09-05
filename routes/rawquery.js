const express = require('express');
const router = express.Router();

const controller = require('../controllers/rawquery');

router.post('/query', controller.query);

module.exports = router;
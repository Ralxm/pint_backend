const express = require('express');
const router = express.Router();
const middleware = require('../middleware')

const controller = require('../controllers/rawquery');

router.post('/query', middleware.checkToken, controller.query);

module.exports = router;
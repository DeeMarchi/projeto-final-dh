const express = require('express');
const router = express.Router();

const IndexController = require('../controllers/Index');

router.get('/', IndexController.home);

module.exports = router;

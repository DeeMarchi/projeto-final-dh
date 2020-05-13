const express = require('express');
const router = express.Router();

const IndexController = require('../controllers/Index');

/* GET home page. */
router.get('/', IndexController.index);

module.exports = router;
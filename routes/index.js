const express = require('express');
const router = express.Router();

const IndexController = require('../controllers/Index');

/* GET home page. */
router.get('/', IndexController.auth);

router.get('/cadastro', IndexController.cadastro);

router.get('/home', IndexController.home);

module.exports = router;

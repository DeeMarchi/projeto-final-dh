const express = require('express');
const router = express.Router();

const IndexController = require('../controllers/Index');
const autenticado = require('../middlewares/autenticado');

router.get('/', autenticado, IndexController.home);

module.exports = router;

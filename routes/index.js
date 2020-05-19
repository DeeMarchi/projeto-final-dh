const express = require('express');
const router = express.Router();

const IndexController = require('../controllers/Index');
const roteiros = require('../controllers/Roteiro');

const autenticado = require('../middlewares/autenticado');



router.get('/', autenticado, IndexController.home);

router.get('/criar-roteiro', roteiros.criaRoteiro);


module.exports = router;

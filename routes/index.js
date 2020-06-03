const express = require('express');
const router = express.Router();

const IndexController = require('../controllers/Index');
const UsuarioController = require('../controllers/Usuario');
const RoteiroController = require('../controllers/Roteiro');

router.get('/', IndexController.home);
router.get('/sobre', IndexController.sobre);

router.get('/pesquisa', IndexController.pesquisa);
router.post('/pesquisa', UsuarioController.buscar);

router.get('/criar-roteiro', RoteiroController.criaRoteiro);

module.exports = router;

const express = require('express');
const router = express.Router();

const IndexController = require('../controllers/Index');
const UsuarioController = require('../controllers/Usuario');
const RoteiroController = require('../controllers/Roteiro');

const autenticado = require('../middlewares/autenticado');

router.get('/', autenticado, IndexController.home);
router.get('/sobre', autenticado, IndexController.sobre);

router.get('/pesquisa', autenticado, IndexController.pesquisa);

router.get('/perfil/:id', autenticado, UsuarioController.perfil);

router.get('/criar-roteiro', autenticado, RoteiroController.criaRoteiro);

module.exports = router;

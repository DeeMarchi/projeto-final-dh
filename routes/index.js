const express = require('express');
const router = express.Router();

const IndexController = require('../controllers/Index');
const UsuarioController = require('../controllers/Usuario');
const RoteiroController = require('../controllers/Roteiro');

const autenticado = require('../middlewares/autenticado');
const perfilEditarProtecao = require('../middlewares/perfilEditarProtecao');
const tratarIdPerfil = require('../middlewares/tratarIdPerfil');

router.get('/', autenticado, IndexController.home);
router.get('/sobre', autenticado, IndexController.sobre);

router.get('/pesquisa', autenticado, IndexController.pesquisa);
router.post('/pesquisa', autenticado, UsuarioController.buscar);

router.get('/perfil/:id', autenticado, tratarIdPerfil, UsuarioController.perfil);
router.get('/perfil/:id/editar', autenticado, tratarIdPerfil, perfilEditarProtecao, UsuarioController.editar);

router.get('/criar-roteiro', autenticado, RoteiroController.criaRoteiro);

module.exports = router;

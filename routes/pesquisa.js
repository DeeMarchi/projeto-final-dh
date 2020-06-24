const express = require('express');
const router = express.Router();

const IndexController = require('../controllers/Index');
const UsuarioController = require('../controllers/Usuario');
const RoteiroController = require('../controllers/Roteiro');

router.get('/', IndexController.pesquisa);

router.get('/usuarios', IndexController.pesquisaUsuarios);
router.post('/usuarios', UsuarioController.buscar);

router.get('/roteiros', IndexController.pesquisaRoteiros);
router.post('/roteiros', RoteiroController.buscarRoteiros);

module.exports = router;

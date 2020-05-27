const express = require('express');
const router = express.Router();

const perfilEditarProtecao = require('../middlewares/perfilEditarProtecao');
const UsuarioController = require('../controllers/Usuario');

router.get('/', UsuarioController.perfil);
router.get('/editar', perfilEditarProtecao, UsuarioController.editar);
router.put('/editar', perfilEditarProtecao, UsuarioController.valicadoes, UsuarioController.atualizar);

module.exports = router;

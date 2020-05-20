const express = require('express');
const router = express.Router();

const IndexController = require('../controllers/Index');
const UsuarioController = require('../controllers/Usuario');
const RoteiroController = require('../controllers/Roteiro');

const autenticado = require('../middlewares/autenticado');



router.get('/', autenticado, IndexController.home);
router.get('/sobre', IndexController.sobre);

router.get('/pesquisa', IndexController.pesquisa);

router.get('/perfil/:id', UsuarioController.perfil);

router.get('/criar-roteiro', RoteiroController.criaRoteiro);


module.exports = router;

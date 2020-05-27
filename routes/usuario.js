const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join('public', 'avatar'));
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname);
    },
});

const upload = multer({ storage: storage });

const perfilEditarProtecao = require('../middlewares/perfilEditarProtecao');
const UsuarioController = require('../controllers/Usuario');

router.get('/', UsuarioController.perfil);
router.get('/editar', perfilEditarProtecao, UsuarioController.editar);
router.put('/editar', perfilEditarProtecao, UsuarioController.valicadoes, upload.any(), UsuarioController.atualizar);

module.exports = router;

const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join('public', 'avatar'));
    },

    filename: function (req, file, cb) {
        cb(null, 'usuario' + req.session.usuario.id + path.extname(file.originalname));
    },
});

const upload = multer({ 
    storage: storage,
    /* 2000000 = 2mb*/
    limits: {
        fileSize: 2000000,
    },
    fileFilter: function (req, file, cb) {
        if (file.mimetype !== 'image/png' && file.mimetype !== 'image/jpeg') {
            req.fileValidationError = 'apenas aceitamos jpg ou png';
            return cb(null, false, new Error('apenas aceitamos jpg ou png'));
        }
        cb(null, true);
    },
});

const perfilEditarProtecao = require('../middlewares/perfilEditarProtecao');
const UsuarioController = require('../controllers/Usuario');

router.get('/', UsuarioController.perfil);
router.get('/editar', perfilEditarProtecao, UsuarioController.editar);
router.put('/editar', perfilEditarProtecao, UsuarioController.valicadoes, upload.single('novoAvatar'), UsuarioController.atualizar);

module.exports = router;

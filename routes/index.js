const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join('public', 'imagens'));
    },

    filename: function (req, file, cb) {
        cb(null,Date.now()+'-'+file.originalname);
    },
});

var upload = multer({storage:storage})




const IndexController = require('../controllers/Index');
const UsuarioController = require('../controllers/Usuario');
const RoteiroController = require('../controllers/Roteiro');

router.get('/', IndexController.home);
router.get('/sobre', IndexController.sobre);

router.get('/pesquisa', IndexController.pesquisa);
router.post('/pesquisa', UsuarioController.buscar);

router.get('/criar-roteiro', RoteiroController.criaRoteiro);
router.post('/criar-roteiro',upload.any(), RoteiroController.criarRoteiro);

router.get('/roteiro/:id', RoteiroController.showRoteiro);

module.exports = router;

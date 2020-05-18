const express = require('express');
const router = express.Router();

const AuthController = require('../controllers/Auth');
const voltarHome = require('../middlewares/voltarHome');

router.get('/', voltarHome, AuthController.auth);
router.post('/', AuthController.logar);

router.get('/cadastro', voltarHome, AuthController.cadastro);
router.post('/cadastro', AuthController.validacoes, AuthController.cadastrar);

module.exports = router;

const express = require('express');
const router = express.Router();

const AuthController = require('../controllers/Auth');

router.get('/', AuthController.auth);

router.get('/cadastro', AuthController.cadastro);

module.exports = router;

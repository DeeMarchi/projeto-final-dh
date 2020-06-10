const express = require('express');
const router = express.Router();

const CurtidaController = require('../controllers/Curtida');

router.post('/roteiro/:id', CurtidaController.curtirRoteiro);



module.exports = router;
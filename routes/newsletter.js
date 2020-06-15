const express = require('express');
const router = express.Router();

const NewsletterController = require('../controllers/Newsletter');

router.post('/inscrever', NewsletterController.valicadoes, NewsletterController.cadastrar);

module.exports = router;

const express = require('express');
const router = express.Router();
const SolicitacaoDoacaoController = require('../controllers/SolicitacaoDoacaoController');


router.get('/', SolicitacaoDoacaoController.base);

module.exports = router;
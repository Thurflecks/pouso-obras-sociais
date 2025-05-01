const express = require('express');
const router = express.Router();
const DoacaoController = require('../controllers/DoacaoController');
const SolicitacaoDoacaoController = require('../controllers/SolicitacaoDoacaoController');


router.get('/', DoacaoController.base);
router.post('/add', DoacaoController.add);
router.post('/solicitacao', SolicitacaoDoacaoController.solicitacao);

module.exports = router;
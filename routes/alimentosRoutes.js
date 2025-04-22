const express = require('express');
const router = express.Router();
const AlimentosController = require('../controllers/AlimentosController');

router.get('/cadastro', AlimentosController.cadastro);
router.post('/add_cadastro', AlimentosController.add_cadastro);

module.exports = router 
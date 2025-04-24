const express = require('express');
const router = express.Router();
const MantimentosController = require('../controllers/MantimentosController');
const AdminController = require('../controllers/AdminController');
const FarmaciaController = require('../controllers/FarmaciaController');

router.get('/mantimentos/cadastro', MantimentosController.cadastro);
router.post('/mantimentos/add_cadastro', MantimentosController.add_cadastro);

module.exports = router 
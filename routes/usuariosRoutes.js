const express = require('express');
const router = express.Router();
const UsuarioController = require('../controllers/UsuarioController');

router.get('/cadastro', UsuarioController.cadastro);
router.post('/add_cadastro', UsuarioController.add_cadastro);
router.get('/', UsuarioController.index);


module.exports = router
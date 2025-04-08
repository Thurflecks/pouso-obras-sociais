const express = require('express');
const router = express.Router();
const UsuarioController = require('../controllers/UsuarioController');

router.get('/ola', UsuarioController.ola);

module.exports = router
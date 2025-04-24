const express = require('express');
const router = express.Router();
const MantimentosController = require('../controllers/MantimentosController');
const AdminController = require('../controllers/AdminController');
const FarmaciaController = require('../controllers/FarmaciaController');

//admin
router.get('/login', AdminController.login);
router.post('/login/acess', AdminController.loginAcess);

//mantimentos
router.get('/mantimentos/all', MantimentosController.mostrar );

router.get('/mantimentos/edit/:id', MantimentosController.editar);
router.post('/mantimentos/edit/:id', MantimentosController.editando);

router.get('/mantimentos/delete/:id', MantimentosController.deletar);

router.get('/mantimentos/add', MantimentosController.adicionar);
router.post('/mantimentos/add', MantimentosController.adicionando);


//farmacia

module.exports = router 
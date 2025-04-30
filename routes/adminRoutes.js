const express = require('express');
const router = express.Router();
const MantimentosController = require('../controllers/MantimentosController');
const AdminController = require('../controllers/AdminController');
const FarmaciaController = require('../controllers/FarmaciaController');
const authenticate = require('../middlewares/authenticate');
const verifyLogin = require("../middlewares/verifyLogin");
const AdminLoginsController = require('../controllers/AdminLoginsController');
const ControleMantiController = require('../controllers/ControleMantiController');
const verifyNivel = require('../middlewares/verifyNivel');

//admin
router.get('/', authenticate, AdminController.homeAdmin);

router.get('/login', verifyLogin, AdminController.login);
router.post('/login/acess', verifyLogin, AdminController.loginAcess);
router.get('/logout', authenticate, AdminController.logout);

//mantimentos
router.get('/mantimentos/all', authenticate, MantimentosController.mostrar );

router.post('/mantimentos/saida/:id', authenticate, verifyNivel([3, 4]), MantimentosController.saida);

router.get('/mantimentos/edit/:id', authenticate, MantimentosController.editar);
router.post('/mantimentos/edit/:id', authenticate, MantimentosController.editando);

router.get('/mantimentos/delete/:id', authenticate, MantimentosController.deletar);

router.get('/mantimentos/add', authenticate, MantimentosController.adicionar);
router.post('/mantimentos/add', authenticate, MantimentosController.adicionando);


//farmacia

//relatorio 
router.get('/relatorio/login', authenticate, AdminLoginsController.relatorioLogin);
router.get('/relatorio/mantimentos', authenticate, ControleMantiController.relatorioControle);

module.exports = router 
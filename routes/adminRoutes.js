const express = require('express');
const router = express.Router();
const MantimentosController = require('../controllers/MantimentosController');
const AdminController = require('../controllers/AdminController');
const FarmaciaController = require('../controllers/FarmaciaController');
const authenticate = require('../middlewares/authenticate');
const verifyLogin = require("../middlewares/verifyLogin");
const AdminLoginsController = require('../controllers/AdminLoginsController');
const ControleMantiController = require('../controllers/ControleMantiController');
const PacienteController = require('../controllers/PacienteController');
const verifyNivel = require('../middlewares/verifyNivel');
const EpiController = require('../controllers/EpiController');
const EquipamentosController = require('../controllers/EquipamentosController')
const UsuarioController = require('../controllers/UsuarioController');
const DoacaoController = require('../controllers/DoacaoController');
const EventosController = require('../controllers/EventosController');
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });


//admin
router.get('/', authenticate, AdminController.homeAdmin);

router.get('/login', verifyLogin, AdminController.login);
router.post('/login', verifyLogin, AdminController.loginPost);
router.get('/register', authenticate, verifyNivel([4]), AdminController.register);
router.post('/register', authenticate, verifyNivel([4]), AdminController.registerPost);
router.get('/edit', authenticate, AdminController.edit);
router.post('/edit', authenticate, AdminController.editPost);
router.get('/logout', authenticate, AdminController.logout);

//mantimentos
router.get('/mantimentos/show', authenticate, MantimentosController.show);

router.post('/mantimentos/saida/:id', authenticate, verifyNivel([2, 3, 4]), MantimentosController.saida);

router.get('/mantimentos/edit/:id', authenticate, MantimentosController.editar);
router.post('/mantimentos/edit/:id', authenticate, MantimentosController.editarPost);

router.get('/mantimentos/delete/:id', authenticate, MantimentosController.deletar);

router.get('/mantimentos/add', authenticate, MantimentosController.adicionar);
router.post('/mantimentos/add', authenticate, MantimentosController.adicionarPost);


//farmacia
router.get('/farmacia/medicamentos', authenticate, verifyNivel([3, 4]), FarmaciaController.showMedicamentos);
router.get('/farmacia/medicamentos/edit/:id', authenticate, verifyNivel([3, 4]), FarmaciaController.edit);
router.post('/farmacia/medicamentos/edit/:id', authenticate, verifyNivel([3, 4]), FarmaciaController.update);
router.post('/farmacia/medicamentos/saida/:id', authenticate, verifyNivel([3, 4]), FarmaciaController.saida);

router.get('/farmacia/medicamentos/add/:id', authenticate, verifyNivel([3, 4]), FarmaciaController.addMedicamento);
router.post('/farmacia/medicamentos/add', authenticate, verifyNivel([3, 4]), FarmaciaController.addMedicamentoPost);
router.get('/farmacia/medicamentos/search', authenticate, verifyNivel([3, 4]), FarmaciaController.search);
router.post('/farmacia/medicamentos/search', authenticate, verifyNivel([3, 4]), FarmaciaController.searchPost);

//pacientes
router.get('/farmacia/pacientes', authenticate, verifyNivel([3, 4]), PacienteController.showPacientes);
router.get('/farmacia/pacientes/:id/despachar', authenticate, verifyNivel([3, 4]), FarmaciaController.despacharMedicamento);
router.post('/farmacia/pacientes/:id/despachar', authenticate, verifyNivel([3, 4]), FarmaciaController.despacharMedicamentoPost);


//epi
router.get('/farmacia/epi', authenticate, verifyNivel([3, 4]), EpiController.showEPI);

//equipamentos
router.get('/farmacia/equipamentos', authenticate, verifyNivel([3, 4]), EquipamentosController.showEquipamentos);
router.get('/farmacia/equipamentos/edit', authenticate, verifyNivel([3, 4]), EquipamentosController.edit);


//usuarios
router.get('/usuarios', authenticate, verifyNivel([4]), UsuarioController.index);
router.get('/usuarios/editar/:id', authenticate, verifyNivel([4]), UsuarioController.editar);
router.post('/usuarios/editar/:id', authenticate, verifyNivel([4]), UsuarioController.editarPost);


//relatorio 
router.get('/relatorio', authenticate, AdminController.relatorio);
router.get('/relatorio/login', authenticate, AdminLoginsController.relatorioLogin);
router.get('/relatorio/mantimentos', authenticate, ControleMantiController.relatorioControle);
router.get('/relatorio/farmacia', authenticate, FarmaciaController.relatorioFarmacia);
router.get('/relatorio/doadores', authenticate, ControleMantiController.relatorioDoadoresMantimentos);
router.get('/relatorio/doacoes', authenticate, DoacaoController.relatorioDoacao);

//eventos
router.get('/eventos', authenticate, EventosController.listar)
router.get('/eventos/criar', authenticate, EventosController.criar)
router.post('/eventos/criar', authenticate, upload.single('foto'), EventosController.criarPost)
router.get('/eventos/editar/:id', authenticate, EventosController.editar)
router.post('/eventos/editar/:id', authenticate, upload.single('foto'), EventosController.editarPost)
router.post('/eventos/deletar/:id', authenticate, EventosController.deletar)

//scroller
router.get('/scroller', authenticate, AdminController.scroller);
router.post('/scroller', authenticate, upload.single('image'), AdminController.scrollerPost);
router.post('/scroller/delete', authenticate, AdminController.scrollerDelete);

//


module.exports = router
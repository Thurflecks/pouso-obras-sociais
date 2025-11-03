const express = require('express');
const router = express.Router();
const EventosController = require('../controllers/EventosController');



router.get('/', EventosController.index);
router.get('/editar', EventosController.editar);


module.exports = router;
const express = require('express');
const router = express.Router();
const EventosController = require('../controllers/EventosController');



router.get('/', EventosController.index);

module.exports = router;
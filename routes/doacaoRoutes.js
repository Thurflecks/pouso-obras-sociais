const express = require('express');
const router = express.Router();
const DoacaoController = require('../controllers/DoacaoController');


router.get('/', DoacaoController.base);
router.post('/add', DoacaoController.add);

module.exports = router;
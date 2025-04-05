const express = require('express');
const router = express.Router();
const MainController = require('../controllers/MainController');

router.get('/home', MainController.home);
router.get('/', MainController.base);

module.exports = router;
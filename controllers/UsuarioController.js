const UsuarioModel = require('../models/Usuario');

module.exports = class UsuarioController {
    static ola(req, res) {
        res.send('Olá, mundo!');
    }
}
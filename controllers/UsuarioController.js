const UsuarioModel = require('../models/Usuario');

module.exports = class UsuarioController {
   static cadastro(req, res) {
      res.render('usuarios/cadastro');
   }
   static add_cadastro(req, res) {
      res.send('Cadastro realizado com sucesso!');
   }
}
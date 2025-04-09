const UsuarioModel = require('../models/Usuario');

module.exports = class UsuarioController {
   static cadastro(req, res) {
      res.render('usuarios/cadastro');
   }
   static async add_cadastro(req, res) {
      await console.log(req.body);
      res.send(req.body)
   }
}
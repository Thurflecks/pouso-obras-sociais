const SolicitacaoDoacao = require('../models/SolicitacaoDoacao')

module.exports = class SolicitacaoDoacaoController {
    static base(req, res) {
        res.render("doacao/doarAgora")
    }
}
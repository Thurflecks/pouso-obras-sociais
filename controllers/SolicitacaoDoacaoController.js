const SolicitacaoDoacao = require('../models/SolicitacaoDoacao')

module.exports = class SolicitacaoDoacaoController {
    static base(req, res) {
        res.send("Solicitação de Doação")
    }
}
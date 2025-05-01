const SolicitacaoDoacao = require('../models/SolicitacaoDoacao')

module.exports = class SolicitacaoDoacaoController {
    static async solicitacao(req, res) {
        try {
            const { nome, telefone, dataDisponibilidade, mensagem, endereco } = req.body;
            await SolicitacaoDoacao.create({
                nome,
                telefone,
                endereco,
                dataDisponibilidade,
                mensagem
            });
            res.redirect('/doacao');
        } catch (error) {
            console.log(error);
        }
    }
}
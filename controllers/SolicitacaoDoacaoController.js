const SolicitacaoDoacao = require('../models/SolicitacaoDoacao')

module.exports = class SolicitacaoDoacaoController {
    static async solicitacao(req, res) {
        try {
            const { nomeOutrasDoacoes, telefoneOutrasDoacoes, dataDisponibilidade, mensagem, endereco } = req.body;
            await SolicitacaoDoacao.create({
                nome: nomeOutrasDoacoes,
                telefone: telefoneOutrasDoacoes,
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
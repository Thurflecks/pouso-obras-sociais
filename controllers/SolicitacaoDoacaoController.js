const SolicitacaoDoacao = require('../models/SolicitacaoDoacao')

module.exports = class SolicitacaoDoacaoController {
    static async solicitacao(req, res) {
        try {
            const { nome, email, telefone, data, mensagem, endereco } = req.body;
            await SolicitacaoDoacao.create({
                nome,
                email,
                telefone,
                endereco,
                dataDisponibilidade: data,
                mensagem
            });
            res.redirect('/doacao');
        } catch (error) {
            console.log(error);
        }
    }
}
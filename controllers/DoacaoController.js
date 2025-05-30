const DoacaoModel = require('../models/Doacao');

module.exports = class DoacaoController {
    static base(req, res) {
        try {
            const data = new Date().toLocaleString('sv-SE', {
                timeZone: 'America/Sao_Paulo',
                hour12: false
            }).replace(' ', 'T').slice(0, 16); // Exemplo: "2025-05-01T14:45"

            res.render("doacao/doarAgora", { data });
        } catch (error) {
            console.log(error, 'erro ao renderizar a página de doação');
            res.status(500).redirect('/');
        }
    }

    static async add(req, res) {
        try {
            const { nome, telefone, valor } = req.body;
            await DoacaoModel.create({
                nome,
                telefone,
                valor
            });
            res.redirect('/doacao');
        } catch (error) {
            console.log(error, 'erro ao salvar a doação');
            res.status(500).redirect('/');
        }
    }
}

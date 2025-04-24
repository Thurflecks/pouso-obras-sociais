const MantimentosModel = require('../models/Mantimentos');

module.exports = class MantimentosController {
    static cadastro(req, res) {
        res.render('mantimentos/cadastro')
    }
    static async add_cadastro(req, res) {
        try {
            const {nome, quantidade, doador, data} = req.body;
            await MantimentosModel.create({
                produto: nome, 
                quantidade, 
                doador, 
                data
            });
            res.redirect('/');
            
        } catch (error) {
            res.send('erro ao adicionar o alimento');
        }
    }
}
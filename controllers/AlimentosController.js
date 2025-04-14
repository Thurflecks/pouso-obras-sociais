const AlimentosModel = require('../models/Alimentos');

module.exports = class AlimentosController {
    static cadastro(req, res) {
        res.render('alimentos/cadastro')
    }
    static async add_cadastro(req, res) {
        try {
            const {nome, quantidade, doador, data} = req.body;
            await AlimentosModel.create({
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
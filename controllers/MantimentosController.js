const MantimentosModel = require('../models/Mantimentos');


module.exports = class MantimentosController {

    static async mostrar(req, res) {
        try {
            const mantimentos = await MantimentosModel.findAll();
            const mantimentosAjeitados = mantimentos.map(mantimento => {
                const dataFormatada = new Date(mantimento.data).toLocaleDateString('pt-BR');
                return {
                    ...mantimento.dataValues,
                    nome: mantimento.produto,
                    descricao: mantimento.descricao,
                    categoria: mantimento.categoria,
                    quantidade: mantimento.quantidade,
                    data: dataFormatada,
                    doador: mantimento.doador,
                    id: mantimento.id_mantimento
                };
            });
            const emailUser = req.session.user.email;
            res.render('mantimentos/all', { mantimentosAjeitados, emailUser });
        } catch (error) {
            console.log(error, 'erro ao mostrar o estoque');
        }
    }

    static async deletar(req, res) {
        try {
            const { id } = req.params;
            await MantimentosModel.destroy({ where: { id_mantimento: id } });
            res.redirect('/admin/mantimentos/all');
        } catch (error) {
            console.log(error, 'erro ao deletar o mantimento');
        }
    }

    static async editar(req, res) {
        try {
            const { id } = req.params;
            const mantimento = await MantimentosModel.findOne({ where: { id_mantimento: id } });
            const emailUser = req.session.user.email;
            res.render('mantimentos/edit', { mantimento, emailUser });
        } catch (error) {
            console.log(error, 'erro ao exibir a pagina de editar o mantimento', );
        }
    }

    static async editando(req, res) {
        try {
            const { id } = req.params;
            const { nome, quantidade, doador, data, categoria, descricao } = req.body;
            await MantimentosModel.update({
                produto: nome,
                quantidade,
                doador,
                data,
                categoria,
                descricao
            }, { where: { id_mantimento: id } });
            res.redirect('/admin/mantimentos/all');
        } catch (error) {
            console.log(error, 'erro ao editar o mantimento');
        }
    }

    static adicionar(req, res) {
        const emailUser = req.session.user.email;
        res.render('mantimentos/add', { emailUser });
    }
    static async adicionando(req, res) {
        try {
            const { nome, quantidade, doador, data, categoria, descricao } = req.body;
            await MantimentosModel.create({
                produto: nome,
                quantidade,
                doador,
                data,
                categoria,
                descricao
            });
            res.redirect('/');

        } catch (error) {
            console.log(error);
            res.send('erro ao adicionar o alimento');
        }
    }
}
const { where, DATEONLY } = require('sequelize');
const MantimentosModel = require('../models/Mantimentos');
const ControleMantimentosModel = require('../models/ControleMantimentos');
const { Op } = require('sequelize');
const dataAtual = new Date().toLocaleDateString('fr-CA', {
    timeZone: 'America/Sao_Paulo'
});


module.exports = class MantimentosController {

    static async show(req, res) {
        try {
            const search = String(req.query.search || "");
            let order = 'DESC';
            if (req.query.order === 'old') {
                order = 'ASC';
            } else if (req.query.order === 'new') {
                order = 'DESC';
            }
            const mantimentos = await MantimentosModel.findAll({
                where: {
                    produto: {
                        [Op.like]: `%${search}%`
                    }
                }, order: [['updated_at', order]]
            });
            if (mantimentos.length === 0) {
                req.flash('message', 'Nenhum produto correspondente com: ' + search);
            }
            const mantimentosAjeitados = mantimentos.map(mantimento => {
                const dataFormatada = mantimento.data.split('T')[0].split('-').reverse().join('/');
                return {
                    ...mantimento.dataValues,
                    nome: mantimento.produto,
                    descricao: mantimento.descricao,
                    categoria: mantimento.categoria,
                    quantidade: mantimento.quantidade,
                    data: dataFormatada,
                    doador: mantimento.doador,
                    telefoneDoador: mantimento.telefoneDoador,
                    id: mantimento.id_mantimento
                };
            });
            res.render('mantimentos/show', { mantimentosAjeitados, search });
        } catch (error) {
            console.log(error, 'erro ao mostrar o estoque');
            res.status(500).redirect('/admin');
        }
    }

    static async deletar(req, res) {
        try {
            const { id } = req.params;
            await MantimentosModel.destroy({ where: { id_mantimento: id } });
            res.redirect('/admin/mantimentos/show');
        } catch (error) {
            console.log(error, 'erro ao deletar o mantimento');
            res.status(500).redirect('/admin/mantimentos/show');
        }
    }

    static async saida(req, res) {
        try {
            const { id } = req.params;
            const saida = req.body.saida;
            const mantimento = await MantimentosModel.findOne({ where: { id_mantimento: id } });
            await mantimento.update({ quantidade: mantimento.quantidade - saida });
            try {
                if (mantimento.quantidade <= 0) {
                    await mantimento.destroy();
                }
            } catch (error) {
                console.log(error, 'erro ao deletar o mantimento');
            }
            await ControleMantimentosModel.create({
                nome: mantimento.produto,
                cpf_admin: req.session.user.cpf,
                quantidade: saida,
                doador: mantimento.doador,
                telefoneDoador: mantimento.telefoneDoador,
                categoria: mantimento.categoria,
                descricao: mantimento.descricao,
                movimentacao: 'Saída'
            });
            res.redirect(`/admin/mantimentos/show`);
        } catch (error) {
            console.log(error, 'erro ao atualizar quantidade');
            res.status(500).redirect('/admin/mantimentos/show');
        }
    }

    static async editar(req, res) {
        try {
            const { id } = req.params;
            const mantimento = await MantimentosModel.findOne({ where: { id_mantimento: id } });
            res.render('mantimentos/edit', { mantimento, dataAtual });
        } catch (error) {
            console.log(error, 'erro ao exibir a pagina de editar o mantimento',);
            res.status(500).redirect('/admin/mantimentos/show');
        }
    }

    static async editarPost(req, res) {
        try {
            const { id } = req.params;
            const { nome, quantidade, doador, data, categoria, descricao, telefoneDoador } = req.body;
            console.log('oi to aqui')
            const mantimento = await MantimentosModel.update({
                produto: nome,
                quantidade,
                doador,
                telefoneDoador,
                data,
                categoria,
                descricao
            }, { where: { id_mantimento: id } });
            console.log(data)
            try {
                if (mantimento.quantidade === 0) {
                    mantimento.destroy();
                }
            } catch (error) {
                console.log(error, 'erro ao editar o mantimento');
            }
            await ControleMantimentosModel.create({
                nome,
                cpf_admin: req.session.user.cpf,
                quantidade,
                doador,
                telefoneDoador,
                categoria,
                descricao,
                movimentacao: 'Edição'
            });
            res.redirect('/admin/mantimentos/show');
        } catch (error) {
            console.log(error, 'erro ao editar o mantimento');
        }
    }

    static adicionar(req, res) {
        res.render('mantimentos/add', { dataAtual });
    }
    static async adicionarPost(req, res) {
        try {
            const { nome, quantidade, doador, data, categoria, descricao, telefoneDoador } = req.body;
            await MantimentosModel.create({
                produto: nome,
                quantidade,
                doador,
                telefoneDoador,
                data,
                categoria,
                descricao
            });
            await ControleMantimentosModel.create({
                nome,
                cpf_admin: req.session.user.cpf,
                quantidade,
                doador,
                telefoneDoador,
                categoria,
                descricao,
                movimentacao: 'Entrada'
            });
            res.redirect('/admin/mantimentos/show');

        } catch (error) {
            console.log(error);
            res.status(500).redirect('/admin/mantimentos/show');
        }
    }
}
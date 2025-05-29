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
                const dataValidadeFormatada = mantimento.data_validade === null
                    ? null
                    : mantimento.data_validade.split('T')[0].split('-').reverse().join('/');

                return {
                    ...mantimento.dataValues,
                    nome: mantimento.produto,
                    descricao: mantimento.descricao,
                    categoria: mantimento.categoria,
                    quantidade: mantimento.quantidade,
                    data: dataFormatada,
                    doador: mantimento.doador,
                    telefoneDoador: mantimento.telefoneDoador,
                    id: mantimento.id_mantimento,
                    lote: mantimento.lote,
                    data_validade: dataValidadeFormatada,
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
                data_validade: mantimento.data_validade,
                lote: mantimento.lote,
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
            const { nome, quantidade, doador, data, categoria, descricao, telefoneDoador, lote, data_validade } = req.body;
            const mantimento = await MantimentosModel.update({
                produto: nome,
                quantidade,
                doador,
                telefoneDoador,
                data,
                categoria,
                descricao,
                lote: lote || null,
                data_validade: data_validade || null,
            }, { where: { id_mantimento: id } });
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
                lote: lote || null,
                data_validade: data_validade || null,
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
            const { nome, quantidade, doador, data, categoria, descricao, telefoneDoador, lote, data_validade } = req.body;
            await MantimentosModel.create({
                produto: nome,
                quantidade,
                doador,
                telefoneDoador,
                data,
                lote: lote || null,
                data_validade: data_validade || null,
                categoria,
                descricao
            });
            await ControleMantimentosModel.create({
                nome,
                cpf_admin: req.session.user.cpf,
                quantidade,
                doador,
                lote: lote || null,
                data_validade: data_validade || null,
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
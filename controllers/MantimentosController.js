const { where } = require('sequelize');
const MantimentosModel = require('../models/Mantimentos');
const ControleMantimentosModel = require('../models/ControleMantimentos');
const data = new Date().toLocaleDateString('pt-BR', { timeZone: 'America/Sao_Paulo' })
    .split('/')
    .reverse()
    .join('-');


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
                    telefoneDoador: mantimento.telefoneDoador,
                    id: mantimento.id_mantimento
                };
            });
            const cpfUser = req.session.user.cpf;
            res.render('mantimentos/all', { mantimentosAjeitados, cpfUser });
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
                quantidade: saida,
                doador: mantimento.doador,
                telefoneDoador: mantimento.telefoneDoador,
                categoria: mantimento.categoria,
                descricao: mantimento.descricao,
                movimentacao: 'Saída'
            });                                                                                                                                   
            res.redirect(`/admin/mantimentos/all`);
        } catch (error) {
            console.log(error, 'erro ao atualizar quantidade');
        }
    }

    static async editar(req, res) {
        try {
            const { id } = req.params;
            const mantimento = await MantimentosModel.findOne({ where: { id_mantimento: id } });
            const cpfUser = req.session.user.cpf;
            res.render('mantimentos/edit', { mantimento, cpfUser, data });
        } catch (error) {
            console.log(error, 'erro ao exibir a pagina de editar o mantimento',);
        }
    }

    static async editando(req, res) {
        try {
            const { id } = req.params;
            const { nome, quantidade, doador, data, categoria, descricao, telefoneDoador } = req.body;
            const mantimento = await MantimentosModel.update({
                produto: nome,
                quantidade,
                doador,
                telefoneDoador,
                data,
                categoria,
                descricao
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
                quantidade,
                doador,
                telefoneDoador,
                categoria,
                descricao,
                movimentacao: 'Edicão'
            });
            res.redirect('/admin/mantimentos/all');
        } catch (error) {
            console.log(error, 'erro ao editar o mantimento');
        }
    }

    static adicionar(req, res) {
        const cpfUser = req.session.user.cpf;
        res.render('mantimentos/add', { cpfUser, data });
    }
    static async adicionando(req, res) {
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
                quantidade,
                doador,
                telefoneDoador,
                categoria,
                descricao,
                movimentacao: 'Entrada'
            });
            res.redirect('/admin/mantimentos/all');

        } catch (error) {
            console.log(error);
            res.send('erro ao adicionar o alimento');
        }
    }
}
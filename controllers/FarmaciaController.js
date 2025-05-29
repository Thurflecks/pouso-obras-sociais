const FarmaciaModel = require('../models/Farmacia');
const { Op } = require('sequelize');
const MedicamentosModel = require('../models/Medicamentos');

module.exports = class FarmaciaController {
    static async showMedicamentos(req, res) {
        const search = String(req.query.search || "");
        const table = String(req.query.table || "");
        let order = 'DESC';
        if (req.query.order === 'old') {
            order = 'ASC';
        } else if (req.query.order === 'new') {
            order = 'DESC';
        }

        const farmacia = await FarmaciaModel.findAll({
            where: {
                [table ? table : 'nome']: {
                    [Op.like]: `%${search}%`
                }
            }, order: [['updated_at', order]]
        });
        if (farmacia.length === 0) {
            req.flash('message', 'Nenhum medicamento correspondente com: ' + search);
        }

        const farmaciaAjeitados = farmacia.map(item => {
            const dataFormatada = item.data_validade.split('T')[0].split('-').reverse().join('/');
            return {
                ...item.dataValues,
                id: item.id_remedio,
                nome: item.nome,
                quantidade: item.quantidade,
                concentracao: item.concentracao,
                tipo: item.tipo,
                categoria: item.categoria,
                classe_terapeutica: item.classe_terapeutica,
                controleEspecial: item.controleEspecial,
                data_validade: dataFormatada
            }
        });

        res.render('farmacia/medicamentos', { farmaciaAjeitados, search });
    }
    static async edit(req, res) {
        const id = req.params.id;
        try {
            const farmacia = await FarmaciaModel.findOne({
                where: { id_remedio: id },
            });
            const dataValidade = farmacia.data_validade.split('T')[0].split('-').reverse().join('/');
            const dataFabricacao = farmacia.data_fabricacao.split('T')[0].split('-').reverse().join('/');

            if (!farmacia) {
                return req.flash("message", "Medicamento não encontrado");
            }
            res.render('farmacia/editMedicamento', { farmacia, dataValidade, dataFabricacao });
        } catch (error) {
            console.log(error);
            res.status(500).send("Erro ao buscar medicamento");
        }
    }
    static async update(req, res) {
        try {
            const id = req.params.id;
            const { nome, quantidade, concentracao, lote, tipo, categoria, classe_terapeutica, controleEspecial, data_validade, data_fabricacao } = req.body;
            console.log(req.body);
            await FarmaciaModel.update({
                nome,
                quantidade,
                concentracao,
                lote,
                tipo,
                categoria,
                classe_terapeutica,
                controleEspecial: controleEspecial === 'on' ? 1 : 0,
                data_validade,
                data_fabricacao
            }, {
                where: { id_remedio: id }
            }).then(() => {
                req.flash('message', 'Medicamento atualizado com sucesso!');
                res.redirect('/admin/farmacia/medicamentos');
            }).catch((err) => {
                console.log(err);
                req.flash('message', 'Erro ao atualizar o medicamento');
                res.redirect('/admin/farmacia/medicamentos');
            });
        } catch (error) {
            console.log(error);
            res.status(500).send("Erro ao atualizar medicamento");
        }

    }
    static async saida(req, res) {
        try {
            const id = req.params.id;
            const { saida } = req.body;
            const farmacia = await FarmaciaModel.findOne({
                where: { id_remedio: id },
            });
            if (!farmacia) {
                req.flash("message", "Medicamento não encontrado");
                return res.redirect('/admin/farmacia/medicamentos');
            }
            farmacia.update({
                quantidade: farmacia.quantidade - saida
            }).then((async () => {
                if (farmacia.quantidade <= 0) {
                    await farmacia.destroy();
                    req.flash('message', 'Medicamento retirado com sucesso! Mas com o estoque zerado.');
                    return res.redirect('/admin/farmacia/medicamentos');
                }
                req.flash('message', 'Medicamento retirado com sucesso!');
                return res.redirect('/admin/farmacia/medicamentos');
            }))
        } catch (error) {
            console.log(error);
            req.flash('message', 'Erro');
            res.status(500).redirect('/admin/farmacia/medicamentos');
        }
    }
    static async search(req, res) {
        res.render('farmacia/pesquisa');
    }
    static async searchPost(req, res) {
        try {
            const termo = String(req.body.termo || "");
            console.log(termo);

            const itens = await MedicamentosModel.findAll({
                where: {
                    NOME_PRODUTO: {
                        [Op.like]: `%${termo}%`
                    }
                }
            });

            return res.json(itens);
        } catch (error) {
            console.log(error);
            req.flash('message', 'Erro ao buscar medicamento');
            res.status(500).redirect('/admin/farmacia/medicamentos');
        }
    }

    static async addMedicamento(req, res) {
        const id = req.params.id;
        try {
            const medicamento = await MedicamentosModel.findOne({
                where: {
                    id: id
                }
            });
            res.render('farmacia/addMedicamento', { medicamento });
        } catch (error) {
            console.log(error);
        }
    }
    static async addMedicamentoPost(req, res) {
        res.send('ok');
    }
}
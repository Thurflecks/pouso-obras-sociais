const FarmaciaModel = require('../models/Farmacia');
const { Op } = require('sequelize');
const MedicamentosModel = require('../models/Medicamentos');

module.exports = class FarmaciaController {
    static async showFarmacia(req, res) {
        const search = String(req.query.search || "");
        let order = 'DESC';
        if (req.query.order === 'old') {
            order = 'ASC';
        } else if (req.query.order === 'new') {
            order = 'DESC';
        }

        const farmacia = await FarmaciaModel.findAll({
            where: {
                nome: {
                    [Op.like]: `%${search}%`
                }
            }, order: [['updated_at', order]]
        });
        if (farmacia.length === 0) {
            req.flash('message', 'Nenhum produto correspondente com: ' + search);
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

        res.render('farmacia/farmacia', { farmaciaAjeitados, search });
    }
    static async show(req, res) {
        res.render('farmacia/pesquisa');
    }
    static async pesquisa(req, res) {
        try {
            const termo = String(req.query.termo || "");
            console.log(termo);

            await MedicamentosModel.findAll({
                where: {
                    NOME_PRODUTO: {
                        [Op.like]: `%${termo}%`
                    }
                }
            }).then(itens => {
                return res.json(itens);
            })
        } catch (error) {
            console.log(error);
        }
    }
    static async exibirMedicamento(req, res) {
        const id = req.params.id;
        try {
            const medicamento = await MedicamentosModel.findOne({
                where: {
                    id: id
                }
            });
            res.render('farmacia/exibirMedicamento', { medicamento });
        } catch (error) {
            console.log(error);
        }
    }
    static async addMedicamento(req, res) {
        res.send('ok');
    }
}
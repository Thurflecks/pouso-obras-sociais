const FarmaciaModel = require('../models/Farmacia');
const { Op } = require('sequelize');
const { where, DATEONLY } = require('sequelize');

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
            }, order: [['id_remedio', order]]
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
                controleEspecial: item.controleEspecial,
                data_validade: dataFormatada
            }
        });
        console.log(farmaciaAjeitados);

        res.render('farmacia/farmacia', { farmaciaAjeitados, search });
    }
}
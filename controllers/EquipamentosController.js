const EquipamentosModel = require('../models/EquipamentosFarmacia')
const { Op } = require('sequelize')

module.exports = class EquipamentosController {
    static async showEquipamentos(req, res) {
        try {
            const search = String(req.query.search || "");
            const column = String(req.query.column || "");
            let order = 'DESC';
            if (req.query.order === 'old') {
                order = 'ASC';
            } else if (req.query.order === 'new') {
                order = 'DESC';
            }

            const equipamentos = await EquipamentosModel.findAll({
                where: {
                    [column ? column : 'nome']: {
                        [Op.like]: `%${search}%`
                    }
                }, order: [['updated_at', order]]
            });
            if (equipamentos.length === 0) {
                req.flash('message', 'Nenhum medicamento correspondente com: ' + search);
            }

            const EquipamentosAjeitados = equipamentos.map(item => {
                return {
                    ...item.dataValues,
                    id: item.id,
                    nome: item.nome,
                    codigo: item.codigo,
                    situacao: item.situacao
                }
            });

            res.render('equipamentosFarma/equipamentos', { EquipamentosAjeitados, search });
        }
        catch (error) {
            console.error(error);
            res.status(500).redirect('/admin/farmacia/medicamentos');
        }
    }
}
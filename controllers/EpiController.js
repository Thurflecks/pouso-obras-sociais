const EpiModel = require('../models/Epi');
const { Op } = require('sequelize');

module.exports = class EpiController {
    static async showEPI(req, res) {
        try {
            const search = String(req.query.search || "");
            const column = String(req.query.column || "");
            let order = 'DESC';
            if (req.query.order === 'old') {
                order = 'ASC';
            } else if (req.query.order === 'new') {
                order = 'DESC';
            }

            const epi = await EpiModel.findAll({
                where: {
                    [column ? column : 'nome']: {
                        [Op.like]: `%${search}%`
                    }
                }, order: [['updated_at', order]]
            });
            if (epi.length === 0) {
                req.flash('message', 'Nenhum medicamento correspondente com: ' + search);
            }

            const EpiAjeitados = epi.map(item => {
                const dataFormatada = item.data.split('T')[0].split('-').reverse().join('/');
                return {
                    ...item.dataValues,
                    id: item.id,
                    nome: item.nome,
                    quantidade: item.quantidade,
                    data: dataFormatada,
                    categoria: item.categoria
                }
            });

            res.render('epi/epi', { EpiAjeitados, search });
        }
        catch (error) {
            console.error(error);
            req.flash('message', 'Erro ao acessar a página de EPI')
            res.status(500).redirect('/admin/farmacia/medicamentos');
        }
    }
}
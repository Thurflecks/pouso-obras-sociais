const PacienteModel = require('../models/Paciente');
const { Op } = require('sequelize');

module.exports = class PacienteController {
    static async showPacientes(req, res) {
        const search = String(req.query.search || "");
        const column = String(req.query.column || "");
        let order = 'DESC';
        if (req.query.order === 'old') {
            order = 'ASC';
        } else if (req.query.order === 'new') {
            order = 'DESC';
        }

        const pacientes = await PacienteModel.findAll({
            where: {
                [column ? column : 'nome']: {
                    [Op.like]: `%${search}%`
                }
            }, order: [['updated_at', order]]
        });
        if (pacientes.length === 0) {
            req.flash('message', 'Nenhum paciente correspondente com: ' + search);
        }

        const PacientesAjeitados = pacientes.map(paciente => {
            const dataFormatada = paciente.dataNasc.split('T')[0].split('-').reverse().join('/');
            return {
                ...paciente.dataValues,
                id: paciente.id,
                nome: paciente.nome,
                cpf: paciente.cpf,
                dataNasc: dataFormatada,
                endereco: paciente.endereco,
                telefone: paciente.telefone
            };
        });
        res.render('pacientes/pacientes', { PacientesAjeitados, search });
    }
    catch(error) {
        console.error(error);
        req.flash('message', 'Erro ao acessar a página de pacientes')
        res.status(500).redirect('/admin/farmacia/medicamentos');
    }
}


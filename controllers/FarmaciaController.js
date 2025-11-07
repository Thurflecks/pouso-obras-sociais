const PDFDocument = require('pdfkit');
const FarmaciaModel = require('../models/Farmacia');
const { Op } = require('sequelize');
const MedicamentosModel = require('../models/Medicamentos');
const PacienteModel = require('../models/Paciente');
const ControleFarmaciaModel = require('../models/ControleFarmacia');

module.exports = class FarmaciaController {
    static async showMedicamentos(req, res) {
        const search = String(req.query.search || "");
        const column = String(req.query.column || "");
        let order = 'DESC';
        if (req.query.order === 'old') {
            order = 'ASC';
        } else if (req.query.order === 'new') {
            order = 'DESC';
        }

        const farmacia = await FarmaciaModel.findAll({
            where: {
                [column ? column : 'nome']: {
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
            
            const medicamentoAntes = await FarmaciaModel.findOne({ where: { id_remedio: id }, raw: true });

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
            });

            const quantidadeMovimentada = quantidade - medicamentoAntes.quantidade;

            await ControleFarmaciaModel.create({
                cpf_admin: req.session.user.cpf,
                nome_medicamento: nome,
                quantidade: quantidadeMovimentada,
                movimentacao: 'Atualização',
                lote: lote,
                data: new Date()
            });

            req.flash('message', 'Medicamento atualizado com sucesso!');
            res.redirect('/admin/farmacia/medicamentos');
        } catch (error) {
            console.log(error);
            res.status(500).send("Erro ao atualizar medicamento");
        }
    }
    static async saida(req, res) {
        try {
            const id = req.params.id;
            const { saida } = req.body;
            const farmacia = await FarmaciaModel.findOne({ where: { id_remedio: id } });

            if (!farmacia) {
                req.flash("message", "Medicamento não encontrado");
                return res.redirect('/admin/farmacia/medicamentos');
            }

            const quantidadeFinal = farmacia.quantidade - saida;

            if (quantidadeFinal <= 0) {
                await ControleFarmaciaModel.create({
                    cpf_admin: req.session.user.cpf,
                    nome_medicamento: farmacia.nome,
                    quantidade: farmacia.quantidade, // Registra a quantidade total que foi removida
                    movimentacao: 'Remoção (Estoque Zerado)',
                    lote: farmacia.lote,
                    data: new Date()
                });
                await farmacia.destroy();
                req.flash('message', 'Medicamento removido e estoque zerado com sucesso!');
            } else {
                await ControleFarmaciaModel.create({
                    cpf_admin: req.session.user.cpf,
                    nome_medicamento: farmacia.nome,
                    quantidade: saida,
                    movimentacao: 'Saída',
                    lote: farmacia.lote,
                    data: new Date()
                });
                farmacia.quantidade = quantidadeFinal;
                await farmacia.save();
                req.flash('message', 'Medicamento retirado com sucesso!');
            }

            res.redirect('/admin/farmacia/medicamentos');
        } catch (error) {
            console.log(error);
            req.flash('message', 'Erro ao processar a saída do medicamento');
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
        try {
            const { nome, quantidade, concentracao, lote, tipo, categoria, classe_terapeutica, controleEspecial, data_validade, data_fabricacao } = req.body;
            await FarmaciaModel.create({
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
            });

            await ControleFarmaciaModel.create({
                cpf_admin: req.session.user.cpf,
                nome_medicamento: nome,
                quantidade: quantidade,
                movimentacao: 'Entrada',
                lote: lote,
                data: new Date()
            });

            req.flash('message', 'Medicamento adicionado com sucesso!');
            res.redirect('/admin/farmacia/medicamentos');
        } catch (error) {
            console.log(error);
            res.status(500).send("Erro ao adicionar medicamento");
        }
    }

    static async despacharMedicamento(req, res) {
        const pacienteId = req.params.id;
        try {
            const paciente = await PacienteModel.findOne({ where: { id: pacienteId } });
            const medicamentos = await FarmaciaModel.findAll({ where: { quantidade: { [Op.gt]: 0 } } });

            if (!paciente) {
                req.flash('message', 'Paciente não encontrado');
                return res.redirect('/admin/farmacia/pacientes');
            }

            res.render('farmacia/despachar', { paciente, medicamentos });
        } catch (error) {
            console.error(error);
            req.flash('message', 'Erro ao carregar a página de despacho');
            res.redirect('/admin/farmacia/pacientes');
        }
    }

    static async despacharMedicamentoPost(req, res) {
        const pacienteId = req.params.id;
        const { medicamentoId, quantidade } = req.body;

        try {
            const medicamento = await FarmaciaModel.findOne({ where: { id_remedio: medicamentoId } });

            if (!medicamento) {
                req.flash('message', 'Medicamento não encontrado');
                return res.redirect(`/admin/farmacia/pacientes/${pacienteId}/despachar`);
            }

            if (medicamento.quantidade < quantidade) {
                req.flash('message', 'Quantidade insuficiente em estoque');
                return res.redirect(`/admin/farmacia/pacientes/${pacienteId}/despachar`);
            }

            await ControleFarmaciaModel.create({
                cpf_admin: req.session.user.cpf,
                nome_medicamento: medicamento.nome,
                quantidade: quantidade,
                movimentacao: 'Despacho',
                lote: medicamento.lote,
                data: new Date()
            });

            medicamento.quantidade -= quantidade;
            await medicamento.save();

            if (medicamento.quantidade <= 0) {
                await medicamento.destroy();
                await ControleFarmaciaModel.create({
                    cpf_admin: req.session.user.cpf,
                    nome_medicamento: medicamento.nome,
                    quantidade: 0,
                    movimentacao: 'Remoção (Estoque Zerado por Despacho)',
                    lote: medicamento.lote,
                    data: new Date()
                });
            }

            req.flash('message', 'Medicamento despachado com sucesso!');
            res.redirect('/admin/farmacia/pacientes');
        } catch (error) {
            console.error(error);
            req.flash('message', 'Erro ao despachar o medicamento');
            res.redirect(`/admin/farmacia/pacientes/${pacienteId}/despachar`);
        }
    }

    static async relatorioFarmacia(req, res) {
        try {
            const { start_date, end_date } = req.query;
            let whereClause = {};

            if (start_date && end_date) {
                whereClause.data = {
                    [Op.between]: [new Date(start_date), new Date(end_date)]
                };
            } else if (start_date) {
                whereClause.data = {
                    [Op.gte]: new Date(start_date)
                };
            } else if (end_date) {
                whereClause.data = {
                    [Op.lte]: new Date(end_date)
                };
            }

            const controles = await ControleFarmaciaModel.findAll({ where: whereClause });
            const doc = new PDFDocument({ margin: 50 });
            res.setHeader('Content-Type', 'application/pdf');
            res.setHeader('Content-Disposition', 'attachment; filename=relatorio_controle_farmacia.pdf');
            doc.pipe(res);

            doc.fontSize(22).text('Relatório de Controle da Farmácia', {
                align: 'center',
                underline: true
            });
            doc.moveDown(0.5);

            if (start_date || end_date) {
                let dateText = 'Período do filtro:';
                if (start_date) {
                    dateText += ` de ${new Date(start_date).toLocaleDateString('pt-BR', { timeZone: 'UTC' })}`;
                }
                if (end_date) {
                    dateText += ` até ${new Date(end_date).toLocaleDateString('pt-BR', { timeZone: 'UTC' })}`;
                }
                doc.fontSize(12).text(dateText, { align: 'center' });
            }

            doc.moveDown(2);

            controles.forEach(controle => {
                const dataHora = new Date(controle.data);
                const dataFormatada = `${dataHora.toLocaleDateString('pt-BR', { timeZone: 'UTC' })} ${dataHora.toLocaleTimeString('pt-BR', { timeZone: 'UTC' })}`;

                doc.fontSize(14).text(`Cpf do Administrador: `, { continued: true, bold: true }).font('Helvetica-Bold').text(`${controle.cpf_admin}`).font('Helvetica');
                doc.fontSize(14).text(`Medicamento: `, { continued: true, bold: true }).font('Helvetica-Bold').text(`${controle.nome_medicamento}`).font('Helvetica');
                doc.text(`Data: `, { continued: true }).font('Helvetica-Bold').text(`${dataFormatada}`).font('Helvetica');
                doc.text(`Movimentação: `, { continued: true }).font('Helvetica-Bold').text(`${controle.movimentacao}`).font('Helvetica');
                doc.text(`Quantidade: `, { continued: true }).font('Helvetica-Bold').text(`${controle.quantidade}`).font('Helvetica');
                doc.text(`Lote: `, { continued: true }).font('Helvetica-Bold').text(`${controle.lote}`).font('Helvetica');

                doc.moveDown(1);
                doc.moveTo(doc.x, doc.y)
                    .lineTo(550, doc.y)
                    .stroke();

                doc.moveDown(1.5);
            });

            doc.end();
        } catch (error) {
            console.log(error, 'erro ao gerar o relatório de controle da farmácia');
            res.status(500).redirect('/admin/relatorio');
        }
    }
};
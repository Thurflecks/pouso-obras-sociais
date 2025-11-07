const PDFDocument = require('pdfkit');
const ControleMantimentosModel = require('../models/ControleMantimentos');
const { Op } = require('sequelize');


module.exports = class ControleMantimentosController {
    static async relatorioControle(req, res) {
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

            const controles = await ControleMantimentosModel.findAll({ where: whereClause });
            const doc = new PDFDocument({ margin: 50 });
            res.setHeader('Content-Type', 'application/pdf');
            res.setHeader('Content-Disposition', 'attachment; filename=relatorio_controle_mantimentos.pdf');
            doc.pipe(res);

            doc.fontSize(22).text('Relatório de Controle de Mantimentos', {
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
                const data = new Date(controle.data_validade);
                const dataFormatadaValidade = controle.data_validade ? `${data.toLocaleDateString('pt-BR')}` : 'Sem Data';

                doc.fontSize(14).text(`Cpf do Administrador: `, { continued: true, bold: true }).font('Helvetica-Bold').text(`${controle.cpf_admin}`).font('Helvetica');
                doc.fontSize(14).text(`Produto: `, { continued: true, bold: true }).font('Helvetica-Bold').text(`${controle.nome}`).font('Helvetica');
                doc.text(`Data: `, { continued: true }).font('Helvetica-Bold').text(`${dataFormatada}`).font('Helvetica');
                doc.text(`Movimentação: `, { continued: true }).font('Helvetica-Bold').text(`${controle.movimentacao}`).font('Helvetica');
                doc.text(`Quantidade: `, { continued: true }).font('Helvetica-Bold').text(`${controle.quantidade}`).font('Helvetica');
                doc.text(`Categoria: `, { continued: true }).font('Helvetica-Bold').text(`${controle.categoria}`).font('Helvetica');
                doc.text(`Descrição: `, { continued: true }).font('Helvetica-Bold').text(`${controle.descricao}`).font('Helvetica');
                doc.text(`Lote: `, { continued: true }).font('Helvetica-Bold').text(`${controle.lote}`).font('Helvetica');
                doc.text(`Data de Validade: `, { continued: true }).font('Helvetica-Bold').text(`${dataFormatadaValidade}`).font('Helvetica');

                doc.moveDown(1);
                doc.moveTo(doc.x, doc.y) 
                    .lineTo(550, doc.y)  
                    .stroke();            

                doc.moveDown(1.5); 
            });

            doc.end();
        } catch (error) {
            console.log(error, 'erro ao gerar o relatório de controle de mantimentos');
            res.status(500).redirect('/admin/relatorios');
        }
    }
    static async relatorioDoadoresMantimentos(req, res) {
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

            const controles = await ControleMantimentosModel.findAll({ where: whereClause });
            const doc = new PDFDocument({ margin: 50 });
            res.setHeader('Content-Type', 'application/pdf');
            res.setHeader('Content-Disposition', 'attachment; filename=relatorio_doadores_mantimentos.pdf');
            doc.pipe(res);

            doc.fontSize(22).text('Relatório de Doadores de Mantimentos', {
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
                doc.fontSize(14).text(`Doador: `, { continued: true, bold: true }).font('Helvetica-Bold').text(`${controle.doador}`).font('Helvetica');
                doc.text(`Produto: `, { continued: true }).font('Helvetica-Bold').text(`${controle.nome}`).font('Helvetica');
                doc.text(`Data: `, { continued: true }).font('Helvetica-Bold').text(`${new Date(controle.data).toLocaleDateString('pt-BR', { timeZone: 'UTC' })}`).font('Helvetica');
                doc.text(`Telefone do Doador: `, { continued: true }).font('Helvetica-Bold').text(`${controle.telefoneDoador}`).font('Helvetica');

                doc.moveDown(1);
                doc.moveTo(doc.x, doc.y) 
                    .lineTo(550, doc.y)  
                    .stroke();            

                doc.moveDown(1.5); 
            });

            doc.end();
        } catch (error) {
            console.log(error, 'erro ao gerar o relatório de doadores de mantimentos');
            res.status(500).redirect('/admin/relatorios');
        }
    }
}
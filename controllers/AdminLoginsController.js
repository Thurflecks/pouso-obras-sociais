const PDFDocument = require('pdfkit');
const AdminLogins = require('../models/AdminLogins');
const { Op } = require('sequelize');

module.exports = class AdminLoginsController {
    static async relatorioLogin(req, res) {
        try {
            const { start_date, end_date } = req.query;
            let whereClause = {};

            if (start_date && end_date) {
                whereClause.date = {
                    [Op.between]: [new Date(start_date), new Date(end_date)]
                };
            } else if (start_date) {
                whereClause.date = {
                    [Op.gte]: new Date(start_date)
                };
            } else if (end_date) {
                whereClause.date = {
                    [Op.lte]: new Date(end_date)
                };
            }

            const logins = await AdminLogins.findAll({ where: whereClause });
            const doc = new PDFDocument({ margin: 50 });
            res.setHeader('Content-Type', 'application/pdf');
            res.setHeader('Content-Disposition', 'attachment; filename=relatorio_admin_logins.pdf');
            doc.pipe(res);

            doc.fontSize(22).text('Relatório de Acessos', {
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

            logins.forEach(login => {
                const dataHora = new Date(login.date);
                const dataFormatada = `${dataHora.toLocaleDateString('pt-BR', { timeZone: 'UTC' })} ${dataHora.toLocaleTimeString('pt-BR', { timeZone: 'UTC' })}`;

                doc.fontSize(14).text(`CPF do Admin: `, { continued: true }).font('Helvetica-Bold').text(`${login.cpf_admin}`).font('Helvetica');
                doc.text(`Nome do Admin: `, { continued: true }).font('Helvetica-Bold').text(`${login.nome_admin}`).font('Helvetica');
                doc.text(`Data do Login: `, { continued: true }).font('Helvetica-Bold').text(`${dataFormatada}`).font('Helvetica');
                doc.text(`IP do Login: `, { continued: true }).font('Helvetica-Bold').text(`${login.ip_address}`).font('Helvetica');

                doc.moveDown(1);
                doc.moveTo(doc.x, doc.y)
                    .lineTo(550, doc.y)
                    .stroke();

                doc.moveDown(1.5);
            });
            doc.end();
        } catch (error) {
            console.log(error, 'erro ao gerar o relatório de admin logins');
            res.status(500).redirect('/admin/relatorios');
        }
    }
}
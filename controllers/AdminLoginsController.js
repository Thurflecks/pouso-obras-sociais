const PDFDocument = require('pdfkit');
const AdminLogins = require('../models/AdminLogins');

module.exports = class AdminLoginsController {
    static async relatorioLogin(req, res) {
        try {
            const logins = await AdminLogins.findAll();
            const doc = new PDFDocument({ margin: 50 });
            res.setHeader('Content-Type', 'application/pdf');
            res.setHeader('Content-Disposition', 'attachment; filename=relatorio_admin_logins.pdf');
            doc.pipe(res);

            doc.fontSize(22).text('Relatório de Admin Logins', {
                align: 'center',
                underline: true
            });
            doc.moveDown(2);

            logins.forEach(login => {
                const dataHora = new Date(login.date);
                const dataFormatada = `${dataHora.toLocaleDateString('pt-BR')} ${dataHora.toLocaleTimeString('pt-BR')}`;

                doc.fontSize(14).text(`CPF do Admin: `, { continued: true }).font('Helvetica-Bold').text(`${login.cpf_admin}`).font('Helvetica');
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
        }
    }
}

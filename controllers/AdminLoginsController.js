const AdminLoginModel = require('../models/AdminLogins')
const PDFDocument = require('pdfkit');
const fs = require('fs');


module.exports = class AdminLoginsController {
    static async relatorioLogin(req, res) {
        try {
            const logins = await AdminLoginModel.findAll();
            const doc = new PDFDocument();
            const filename = 'relatorio_admin_login.pdf';
            const stream = fs.createWriteStream(filename);
            doc.pipe(stream);


            doc.fontSize(20).text('Relatório de Admin Logins', { align: 'center' });
            doc.moveDown();

            logins.forEach(login => {
                const dataHora = new Date(login.date);
                const dataFormatada = `${dataHora.toLocaleDateString('pt-BR')} ${dataHora.toLocaleTimeString('pt-BR')}`;
                doc.text(`CPF: ${login.cpf_admin}`);
                doc.text(`Data: ${dataFormatada}`);
                doc.text(`IP: ${login.ip_address}`);
                doc.moveDown();
            });

            doc.end();
            stream.on('finish', function () {
                res.download(filename);
            });
        } catch (error) {
            console.log(error, 'erro ao gerarr o relatorio de logins');;
        }
    }
}
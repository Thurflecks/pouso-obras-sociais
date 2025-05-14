const PDFDocument = require('pdfkit');
const ControleMantimentosModel = require('../models/ControleMantimentos');


module.exports = class ControleMantimentosController {
    static async relatorioControle(req, res) {
        try {
            const controles = await ControleMantimentosModel.findAll();
            const doc = new PDFDocument({ margin: 50 });
            res.setHeader('Content-Type', 'application/pdf');
            res.setHeader('Content-Disposition', 'attachment; filename=relatorio_controle_mantimentos.pdf');
            doc.pipe(res);

            doc.fontSize(22).text('Relatório de Controle de Mantimentos', {
                align: 'center',
                underline: true
            });
            doc.moveDown(2);

            controles.forEach(controle => {
                const dataHora = new Date(controle.data);
                const dataFormatada = `${dataHora.toLocaleDateString('pt-BR')} ${dataHora.toLocaleTimeString('pt-BR')}`;

                doc.fontSize(14).text(`Cpf do Administrador: `, { continued: true, bold: true }).font('Helvetica-Bold').text(`${controle.cpf_admin}`).font('Helvetica');
                doc.fontSize(14).text(`Produto: `, { continued: true, bold: true }).font('Helvetica-Bold').text(`${controle.nome}`).font('Helvetica');
                doc.text(`Data: `, { continued: true }).font('Helvetica-Bold').text(`${dataFormatada}`).font('Helvetica');
                doc.text(`Movimentação: `, { continued: true }).font('Helvetica-Bold').text(`${controle.movimentacao}`).font('Helvetica');
                doc.text(`Quantidade: `, { continued: true }).font('Helvetica-Bold').text(`${controle.quantidade}`).font('Helvetica');
                doc.text(`Categoria: `, { continued: true }).font('Helvetica-Bold').text(`${controle.categoria}`).font('Helvetica');
                doc.text(`Descrição: `, { continued: true }).font('Helvetica-Bold').text(`${controle.descricao}`).font('Helvetica');

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
            const controles = await ControleMantimentosModel.findAll();
            const doc = new PDFDocument({ margin: 50 });
            res.setHeader('Content-Type', 'application/pdf');
            res.setHeader('Content-Disposition', 'attachment; filename=relatorio_doadores_mantimentos.pdf');
            doc.pipe(res);

            doc.fontSize(22).text('Relatório de Doadores de Mantimentos', {
                align: 'center',
                underline: true
            });
            doc.moveDown(2);

            controles.forEach(controle => {
                doc.fontSize(14).text(`Doador: `, { continued: true, bold: true }).font('Helvetica-Bold').text(`${controle.doador}`).font('Helvetica');
                doc.text(`Produto: `, { continued: true }).font('Helvetica-Bold').text(`${controle.nome}`).font('Helvetica');           
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

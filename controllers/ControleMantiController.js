const fs = require('fs');
const PDFDocument = require('pdfkit');
const ControleMantimentosModel = require('../models/ControleMantimentos');
const path = require('path')

module.exports = class ControleMantimentosController {
    static async relatorioControle(req, res) {
        try {
            const controles = await ControleMantimentosModel.findAll();
            const doc = new PDFDocument({ margin: 50 });
            const filename = path.join(__dirname, '..', 'temp', 'relatorios', 'relatorio_controle_mantimentos.pdf');
            const stream = fs.createWriteStream(filename);
            doc.pipe(stream);

            doc.fontSize(22).text('Relatório de Controle de Mantimentos', {
                align: 'center',
                underline: true
            });
            doc.moveDown(2);

            controles.forEach(controle => {
                const dataHora = new Date(controle.data);
                const dataFormatada = `${dataHora.toLocaleDateString('pt-BR')} ${dataHora.toLocaleTimeString('pt-BR')}`;

                doc.fontSize(14).text(`Nome: `, { continued: true, bold: true }).font('Helvetica-Bold').text(`${controle.nome}`).font('Helvetica');
                doc.text(`Data: `, { continued: true }).font('Helvetica-Bold').text(`${dataFormatada}`).font('Helvetica');
                doc.text(`Movimentação: `, { continued: true }).font('Helvetica-Bold').text(`${controle.movimentacao}`).font('Helvetica');
                doc.text(`Quantidade: `, { continued: true }).font('Helvetica-Bold').text(`${controle.quantidade}`).font('Helvetica');
                doc.text(`Categoria: `, { continued: true }).font('Helvetica-Bold').text(`${controle.categoria}`).font('Helvetica');
                doc.text(`Doador: `, { continued: true }).font('Helvetica-Bold').text(`${controle.doador}`).font('Helvetica');
                doc.text(`Descrição: `, { continued: true }).font('Helvetica-Bold').text(`${controle.descricao}`).font('Helvetica');
                doc.text(`Telefone do Doador: `, { continued: true }).font('Helvetica-Bold').text(`${controle.telefoneDoador}`).font('Helvetica');

                doc.moveDown(1);
                doc.moveTo(doc.x, doc.y) // posição atual
                    .lineTo(550, doc.y)   // linha até a direita
                    .stroke();            // desenha a linha

                doc.moveDown(1.5); // espaço extra depois de cada registro
            });

            doc.end();
            stream.on('finish', function () {
                res.download(filename);
            });
        } catch (error) {
            console.log(error, 'erro ao gerar o relatório de controle de mantimentos');
        }
    }
}

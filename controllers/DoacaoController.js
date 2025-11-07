const PDFDocument = require('pdfkit');
const DoacaoModel = require('../models/Doacao');

module.exports = class DoacaoController {
    static base(req, res) {
        try {
            const data = new Date().toLocaleString('sv-SE', {
                timeZone: 'America/Sao_Paulo',
                hour12: false
            }).replace(' ', 'T').slice(0, 16); // Exemplo: "2025-05-01T14:45"

            res.render("doacao/doarAgora", { data });
        } catch (error) {
            console.log(error, 'erro ao renderizar a página de doação');
            res.status(500).redirect('/');
        }
    }

    static async add(req, res) {
        try {
            const { nome, telefone, valor } = req.body;
            await DoacaoModel.create({
                nome,
                telefone,
                valor
            });
            res.redirect('/doacao');
        } catch (error) {
            console.log(error, 'erro ao salvar a doação');
            res.status(500).redirect('/');
        }
    }

    static async relatorioDoacao(req, res) {
        try {
            const { start_date, end_date } = req.query;
            const whereClause = {};

            if (start_date && end_date) {
                whereClause.createdAt = {
                    [Op.between]: [new Date(start_date), new Date(end_date)]
                };
            } else if (start_date) {
                whereClause.createdAt = {
                    [Op.gte]: new Date(start_date)
                };
            } else if (end_date) {
                whereClause.createdAt = {
                    [Op.lte]: new Date(end_date)
                };
            }

            const doacoes = await DoacaoModel.findAll({ where: whereClause, raw: true });
            const doc = new PDFDocument({ margin: 50 });

            res.setHeader('Content-Type', 'application/pdf');
            res.setHeader('Content-Disposition', 'attachment; filename=relatorio_doacoes.pdf');
            doc.pipe(res);

            doc.fontSize(22).text('Relatório de Doações', {
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

            doacoes.forEach(doacao => {
                doc.fontSize(14).text(`Nome: `, { continued: true, bold: true }).text(doacao.nome);
                doc.fontSize(14).text(`Telefone: `, { continued: true, bold: true }).text(doacao.telefone);
                doc.fontSize(14).text(`Valor: `, { continued: true, bold: true }).text(doacao.valor);
                doc.fontSize(14).text(`Data: `, { continued: true, bold: true }).text(new Date(doacao.createdAt).toLocaleDateString('pt-BR', { timeZone: 'UTC' }));
                doc.moveDown(1);
                doc.moveTo(doc.x, doc.y)
                    .lineTo(550, doc.y)
                    .stroke();

                doc.moveDown(1.5);
            });

            doc.end();
        } catch (error) {
            console.log(error, 'erro ao gerar o relatório de doações');
            res.status(500).redirect('/');
        }
    }
}
const { Sequelize, sequelize } = require('../db/conn');

const SolicitacaoDoacaoModel = sequelize.define("solicitacaoDoacao", {
    id_solicitacao: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    nome: {
        type: Sequelize.STRING,
        allowNull: false
    },
    telefone: {
        type: Sequelize.STRING,
        allowNull: false
    },
    dataDisponibilidade	: {
        type: Sequelize.DATE,
        allowNull: false,
    },
    endereco: {
        type: Sequelize.STRING,
        allowNull: false
    },
    mensagem: {
        type: Sequelize.TEXT,
        allowNull: true 
    }
}, {
    tableName: 'solicitacaoDoacao',
    timestamps: false
});

module.exports = SolicitacaoDoacaoModel;

const { Sequelize, sequelize } = require('../db/conn');

const DoacaoModel = sequelize.define("doacao", {
    id_doacao: {
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
    data: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
    },
    valor: {
        type: Sequelize.STRING,
        allowNull: false
    }
}, {
    tableName: 'doacao',
    timestamps: false
});

module.exports = DoacaoModel;

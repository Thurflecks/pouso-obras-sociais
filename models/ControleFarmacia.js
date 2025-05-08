const { Sequelize, sequelize } = require('../db/conn');

const ControleFarmaciaModel = sequelize.define("controle_farmacia", {
    id_controle: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    cpf_admin: {
        type: Sequelize.STRING(255),
        allowNull: false
    },
    nome_medicamento: {
        type: Sequelize.STRING(255),
        allowNull: false
    },
    quantidade: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    movimentacao: {
        type: Sequelize.STRING(255),
        allowNull: false
    },
    lote: {
        type: Sequelize.STRING(255),
        allowNull: false
    },
    data: {
        type: Sequelize.DATE,
        allowNull: false
    }
}, {
    tableName: 'controle_farmacia',
    timestamps: false
});

module.exports = ControleFarmaciaModel;

const { Sequelize, sequelize } = require('../db/conn');

const ControleMantimentosModel = sequelize.define("controle_mantimentos", {
    id_controle: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    cpf_admin: {
        type: Sequelize.STRING,
        allowNull: false
    },
    nome: {
        type: Sequelize.STRING,
        allowNull: false
    },
    data: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
    },
    movimentacao: {
        type: Sequelize.STRING,
        allowNull: false
    },
    quantidade: {
        type: Sequelize.STRING,
        allowNull: false
    },
    doador: {
        type: Sequelize.STRING,
        allowNull: false
    },
    descricao: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    telefoneDoador: {
        type: Sequelize.STRING,
        allowNull: false
    },
    categoria: {
        type: Sequelize.STRING,
        allowNull: false
    },
    data_validade: {
        type: Sequelize.DATEONLY,
        allowNull: true
    },
    lote: {
        type: Sequelize.STRING,
        allowNull: true
    },
}, {
    tableName: 'controle_mantimentos',
    timestamps: false
});

module.exports = ControleMantimentosModel;

const { Sequelize, sequelize } = require('../db/conn');

const PacienteModel = sequelize.define("paciente", {
    id_pessoa: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    nome: {
        type: Sequelize.STRING(255),
        allowNull: false
    },
    cpf: {
        type: Sequelize.STRING(255),
        allowNull: false
    },
    endereco: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    dataNasc: {
        type: Sequelize.DATE,
        allowNull: false
    },
    telefone: {
        type: Sequelize.STRING(255),
        allowNull: false
    },
    responsavelRetirada: {
        type: Sequelize.STRING(255),
        allowNull: false
    }
}, {
    tableName: 'paciente',
    timestamps: false
});

module.exports = PacienteModel;

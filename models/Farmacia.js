const { Sequelize, sequelize } = require('../db/conn');

const FarmaciaModel = sequelize.define("farmacia", {
    id_remedio: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    nome: {
        type: Sequelize.STRING(255),
        allowNull: false
    },
    lote: {
        type: Sequelize.STRING(255),
        allowNull: false
    },
    quantidade: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    tipo: {
        type: Sequelize.STRING(255),
        allowNull: false
    },
    concentracao: {
        type: Sequelize.STRING(255),
        allowNull: false
    },
    categoria: {
        type: Sequelize.STRING(255),
        allowNull: false
    },
    classe_terapeutica: {
        type: Sequelize.STRING(255),
        allowNull: false
    },
    controleEspecial: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    },
    data_fabricacao: {
        type: Sequelize.DATEONLY,
        allowNull: false
    },
    data_validade: {
        type: Sequelize.DATEONLY,
        allowNull: false
    }
}, {
    tableName: 'farmacia',
    timestamps: true,
    createdAt: false,
    updatedAt: 'updated_at'
});

module.exports = FarmaciaModel;

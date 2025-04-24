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
    quantidade: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    concentracao: {
        type: Sequelize.STRING(255),
        allowNull: false
    },
    tipo: {
        type: Sequelize.STRING(255),
        allowNull: false
    },
    descricao: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    classe: {
        type: Sequelize.STRING(255),
        allowNull: false
    },
    codigoBarras: {
        type: Sequelize.DOUBLE,
        allowNull: false
    },
    controleEspecial: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    }
}, {
    tableName: 'farmacia',
    timestamps: false
});

module.exports = FarmaciaModel;

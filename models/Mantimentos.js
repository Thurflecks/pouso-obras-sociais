const { Sequelize, sequelize } = require('../db/conn');

const MantimentosModel = sequelize.define("mantimentos", {
    id_mantimento: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    produto: {
        type: Sequelize.STRING,
        allowNull: false
    },
    descricao: {
        type: Sequelize.STRING,
        allowNull: false
    },
    doador: {
        type: Sequelize.STRING,
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
    quantidade: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    data: {
        type: Sequelize.DATE,
        allowNull: false
    }
}, {
    tableName: 'mantimentos',
    timestamps: false
});

module.exports = MantimentosModel;

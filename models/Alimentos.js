const { Sequelize, sequelize } = require('../db/conn');

const AlimentosModel = sequelize.define("alimentos", {
    id_alimento: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    produto: {
        type: Sequelize.STRING,
        allowNull: false
    },
    doador: {
        type: Sequelize.STRING,
        allowNull: false
    },
    quantidade: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    data: {
        type: Sequelize.DATEONLY,
        allowNull: false
    }
}, {
    tableName: 'alimentos',
    timestamps: false
});

module.exports = AlimentosModel;

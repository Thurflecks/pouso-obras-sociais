const { Sequelize, sequelize } = require('../db/conn');

const AdminModel = sequelize.define("admin", {
    id_admin: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    cpf: {
        type: Sequelize.STRING,
        allowNull: false
    },
    senha: {
        type: Sequelize.STRING,
        allowNull: false
    },
    nivel: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'admin',
    timestamps: false
});

module.exports = AdminModel;

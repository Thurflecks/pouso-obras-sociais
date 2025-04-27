const { Sequelize, sequelize } = require('../db/conn');

const AdminLoginModel = sequelize.define("admin_logins", {
    id_login: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    cpf_admin: {
        type: Sequelize.STRING,
        allowNull: false
    },
    date: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
    },
    ip_address: {
        type: Sequelize.STRING,
        allowNull: false
    }
}, {
    tableName: 'admin_logins',
    timestamps: false
});

module.exports = AdminLoginModel;

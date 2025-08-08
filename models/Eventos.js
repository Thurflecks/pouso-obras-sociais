const { Sequelize, sequelize } = require('../db/conn');

const EventosModel = sequelize.define("eventos", {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    nome: {
        type: Sequelize.STRING,
        allowNull: false
    },
    horario: {
        type: Sequelize.STRING,
        allowNull: false
    },
    diaSemana: {
        type: Sequelize.STRING,
        allowNull: false
    },
    foto: {
        type:Sequelize.STRING,
        allowNull: true
    },
    prazo: {
        type: Sequelize.DATE,
        allowNull: false,
    }
}, {
    tableName: 'eventos',
    timestamps: false
});

module.exports = EventosModel;

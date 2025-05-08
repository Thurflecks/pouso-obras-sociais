const { Sequelize, sequelize } = require('../db/conn');

const MedicamentosModel = sequelize.define("medicamentosBASE", {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    TIPO_PRODUTO: {
        type: Sequelize.STRING,
        allowNull: false
    },
    NOME_PRODUTO: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    CATEGORIA_REGULATORIA: {
        type: Sequelize.STRING,
        allowNull: false
    },
    CLASSE_TERAPEUTICA: {
        type: Sequelize.STRING,
        allowNull: false
    },
    SITUACAO_REGISTRO: {
        type: Sequelize.STRING,
        allowNull: false
    }
}, {
    tableName: 'medicamentosBASE',
    timestamps: false
});

module.exports = MedicamentosModel;

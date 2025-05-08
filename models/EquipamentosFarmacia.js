const { Sequelize, sequelize } = require('../db/conn');

const EquipamentosFarmaciaModel = sequelize.define('equipamentosFarmacia', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  nome: {
    type: Sequelize.STRING(255),
    allowNull: false
  },
  codigo: {
    type: Sequelize.STRING(255),
    allowNull: false
  },
  situacao: {
    type: Sequelize.STRING(255),
    allowNull: false
  }
}, {
  tableName: 'equipamentosFarmacia',
  timestamps: false
});

module.exports = EquipamentosFarmaciaModel;

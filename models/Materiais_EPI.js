const { Sequelize, sequelize } = require('../db/conn');

const MateriaisEPIModel = sequelize.define('materiais_EPI', {
  id_material: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  nome_material: {
    type: Sequelize.STRING(255),
    allowNull: false
  },
  categoria: {
    type: Sequelize.STRING(255),
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
  tableName: 'materiais_EPI',
  timestamps: false
});

module.exports = MateriaisEPIModel;

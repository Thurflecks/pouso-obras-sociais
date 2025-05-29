const { Sequelize, sequelize } = require('../db/conn');

const EpiModel = sequelize.define('epi', {
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
  categoria: {
    type: Sequelize.STRING(255),
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
  tableName: 'epi',
  timestamps: true,
  createdAt: false,
  updatedAt: 'updated_at'
});

module.exports = EpiModel;

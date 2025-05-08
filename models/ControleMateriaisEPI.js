const { Sequelize, sequelize } = require('../db/conn');

const ControleMateriaisEPIModel = sequelize.define('controle_materiais_EPI', {
  id_controle: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  cpf_admin: {
    type: Sequelize.STRING(255),
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
  movimentacao: {
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
  tableName: 'controle_materiais_EPI',
  timestamps: false
});

module.exports = ControleMateriaisEPIModel;

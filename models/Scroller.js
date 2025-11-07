const { Sequelize, sequelize } = require('../db/conn');

const Scroller = sequelize.define('scroller', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    image: {
        type: Sequelize.BLOB('long'),
        allowNull: false,
    }
}, {
    tableName: 'scroller',
    timestamps: false
});

module.exports = Scroller;
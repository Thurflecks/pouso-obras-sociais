const { Sequelize } = require("sequelize")
require("dotenv").config({ quiet: true })
const { DB_HOST, DB_NAME, DB_USER, DB_PASSWORD } = process.env;

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
    host: DB_HOST,
    dialect: 'mysql',
    timezone: "-03:00",
    dialectOptions: {
        ssl: false
    }
})

sequelize.authenticate().then(() => {
    console.log("banco de dados conectado")
}).catch(err => {
    console.log(`erro ao conectar ao banco de dados. Erro: ${err}`)
})

module.exports = {
    sequelize, Sequelize
}
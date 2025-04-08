const { Sequelize } = require("sequelize")


const sequelize = new Sequelize("pouso-db", "root", "", {
    host: "localhost",
    dialect: "mysql"
})

sequelize.authenticate().then(() => {
    console.log("banco de dados conectado")
}).catch( err => {
    console.log(`erro ao conectar ao banco de dados. Erro: ${err}`)
})

module.exports = {
    sequelize, Sequelize
}
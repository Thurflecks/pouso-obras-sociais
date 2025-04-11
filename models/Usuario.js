const { Sequelize, sequelize } = require('../db/conn');

const UsuarioModel = sequelize.define("usuario", {
    id_usuario: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nome: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    cpf: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    telefone: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    endereco: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    bairro: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    cep: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    cidade: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    UF: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    trabalho: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    local_trabalho: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    data_nasc: {
        type: Sequelize.DATEONLY,
        allowNull: true,
    },
    rg: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    faixa_etaria: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    escolaridade: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    form_tecnica: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    qnt_membros_familia: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    qnt_menor_idade: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    etnia: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    tipo_moradia: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    situacao_moradia: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    transporte: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    part_economica: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    situacao_trabalho: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    renda_familia: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    beneficio: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    tipo_beneficio: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    cad_unico: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    nec_especial: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    tipo_necessidade: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    medi_continua: {
        type: Sequelize.STRING,
        allowNull: false,
    }
}, {
    tableName: 'usuarios',
    timestamps: false
});
module.exports = UsuarioModel;
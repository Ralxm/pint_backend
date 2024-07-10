const Sequelize = require('sequelize');
const sequelize = require('./database');

const Cargo = sequelize.define('cargo', {
    IDCARGO: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    NOME: Sequelize.TEXT,
    DESCRICAO: Sequelize.TEXT
}, {
    timestamps: false,
    tableName: 'cargo'
});

module.exports = Cargo;
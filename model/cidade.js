const Sequelize = require('sequelize');
const sequelize = require('./database');

const Cidade = sequelize.define('cidades', {
    IDCIDADE: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    NOME: Sequelize.STRING,
},
{
timestamps: false,
tableName: 'cidade',
});

module.exports = Cidade;
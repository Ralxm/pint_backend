const Sequelize = require('sequelize');
const sequelize = require('./database');

const Permissoes = sequelize.define('permissoes', {
    IDPERMISSAO: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    NOME: Sequelize.STRING,
    DESCRICAO: Sequelize.STRING
}, {
    timestamps: false,
    tableName: 'permissoes'
});



module.exports = Permissoes;
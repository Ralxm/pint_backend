const Sequelize = require('sequelize');
const sequelize = require('./database');

const Categoria = sequelize.define('categoria', {
    IDCATEGORIA: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    NOME: Sequelize.STRING,
    DESCRICAO: Sequelize.STRING
}, {
    timestamps: false,
    tableName: 'categoria'
});



module.exports = Categoria;
const Sequelize = require('sequelize');
const sequelize = require('./database');

const Aprovacao = sequelize.define('aprovacao', {
    IDAPROVACAO: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    IDCOLABORADOR: Sequelize.INTEGER,
    DATAAPROVACAO: Sequelize.DATEONLY,
    APROVADA: Sequelize.INTEGER
},
{
timestamps: false,
tableName: 'aprovacao'
});



module.exports = Aprovacao;
const Sequelize = require('sequelize');
const sequelize = require('./database');

const Questionario = sequelize.define('questionario', {
    IDQUESTIONARIO: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    NOME: Sequelize.TEXT,
}, {
    timestamps: false,
    tableName: 'questionario'
});



module.exports = Questionario;
const Sequelize = require('sequelize');
const sequelize = require('./database');
const Questionario = require('./questionario');

const OpcoesEscolha = sequelize.define('opcoesescolha', {
    IDOPCAO: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    NOME: Sequelize.TEXT,
    TIPOOPCAO: Sequelize.INTEGER,
    IDQUESTIONARIO: {
        type: Sequelize.INTEGER,
        references: {
            model: 'questionario',
            key: 'IDQUESTIONARIO'
        }
    }
}, {
    timestamps: false,
    tableName: 'opcoesescolha'
});

OpcoesEscolha.belongsTo(Questionario, { foreignKey: 'IDQUESTIONARIO' });

module.exports = OpcoesEscolha;
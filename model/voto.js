const Sequelize = require('sequelize');
const sequelize = require('./database');
const Colaborador = require('./colaborador');
const OpcoesEscolha = require('./opcoes_escolha');

const Voto = sequelize.define('voto', {
    IDVOTO: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    IDCOLABORADOR: {
        type: Sequelize.INTEGER,
        references: {
            model: 'colaborador',
            key: 'IDCOLABORADOR'
        }
    },
    DATAVOTO: Sequelize.DATE,
    IDOPCOESESCOLHA: {
        type: Sequelize.INTEGER,
        references: {
            model: 'opcoesescolha',
            key: 'IDOPCAO'
        }
    }
}, {
    timestamps: false,
    tableName: 'voto'
});

Voto.belongsTo(Colaborador, { foreignKey: 'IDCOLABORADOR' });
Voto.belongsTo(OpcoesEscolha, { foreignKey: 'IDOPCOESESCOLHA' });



module.exports = Voto;
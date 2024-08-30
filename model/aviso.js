const Sequelize = require('sequelize');
const sequelize = require('./database');

const Aviso = sequelize.define('aviso', {
    IDAVISO: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    COLABORADOR: {
        type: Sequelize.INTEGER,
        references: {
            model: 'colaborador',
            key: 'IDCOLABORADOR'
        }
    },
    ADMINISTRADOR: {
        type: Sequelize.INTEGER,
        references: {
            model: 'colaborador',
            key: 'IDCOLABORADOR'
        }
    },
    DATAAVISO: Sequelize.DATEONLY,
    TEXTO: Sequelize.STRING
},
{
timestamps: false,
tableName: ' aviso'
});

module.exports = Aviso;
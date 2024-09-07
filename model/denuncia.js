const Sequelize = require('sequelize');
const sequelize = require('./database');
const Colaborador = require('./colaborador'); 

const Denuncia = sequelize.define('denuncia', {
    IDDENUNCIA: {
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
    COMENTARIO: Sequelize.INTEGER,
    DATADENUNCIA: Sequelize.DATEONLY,
    MOTIVO: Sequelize.STRING
},
{
timestamps: false,
tableName: 'denuncia'
});

Denuncia.belongsTo(Colaborador, { foreignKey: 'COLABORADOR' });

module.exports = Aviso;
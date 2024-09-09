const Sequelize = require('sequelize');
const sequelize = require('./database');
const Colaborador = require('./colaborador'); 
const Comentario = require('./comentario')
const Cidade = require('./cidade')

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
    COMENTARIO:{
        type: Sequelize.INTEGER,
        references: {
            model: 'comentario',
            key: "IDCOMENTARIO"
        }
    },
    DATADENUNCIA: Sequelize.DATEONLY,
    MOTIVO: Sequelize.STRING,
    CIDADE:{
        type: Sequelize.INTEGER,
        references: {
            model: 'cidade',
            key: "IDCIDADE"
        }
    },
},
{
timestamps: false,
tableName: 'denuncia'
});

Denuncia.belongsTo(Colaborador, { foreignKey: 'COLABORADOR' });
Denuncia.belongsTo(Cidade, { foreignKey: 'CIDADE' });
Denuncia.belongsTo(Comentario, { foreignKey: 'COMENTARIO' });

module.exports = Denuncia;
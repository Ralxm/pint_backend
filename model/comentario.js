const Sequelize = require('sequelize');
const sequelize = require('./database');
const Post = require('./post');
const Colaborador = require('./colaborador');
const Aprovacao = require('./aprovacao');

const Comentario = sequelize.define('comentario', {
    IDCOMENTARIO: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    IDPOST: Sequelize.INTEGER,
    IDAPROVACAO: {
        type: Sequelize.INTEGER,
        references: {
            model: 'aprovacao',
            key: 'IDAPROVACAO'
        }
    },
    IDCOLABORADOR: {
        type: Sequelize.INTEGER,
        references: {
            model: 'colaborador',
            key: 'IDCOLABORADOR'
        }
    },
    DATACOMENTARIO: Sequelize.DATEONLY,
    AVALIACAO: Sequelize.FLOAT,
    TEXTO: Sequelize.STRING,
    RATING:{
        type: Sequelize.FLOAT,
        allowNull: true,
    }
}, {
    timestamps: false,
    tableName: 'comentario'
});

Comentario.belongsTo(Aprovacao, { foreignKey: 'IDAPROVACAO' });
Comentario.belongsTo(Colaborador, { foreignKey: 'IDCOLABORADOR' });



module.exports = Comentario;
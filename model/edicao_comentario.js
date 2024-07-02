const Sequelize = require('sequelize');
const sequelize = require('./database');
const Comentario = require('./comentario');
const Aprovacao = require('./aprovacao');

const EdicaoComentario = sequelize.define('edicaocomentario', {
    IDEDICAOCOMENTARIO: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    IDCOMENTARIO: {
        type: Sequelize.INTEGER,
        references: {
            model: 'comentario',
            key: 'IDCOMENTARIO'
        }
    },
    IDAPROVACAO: {
        type: Sequelize.INTEGER,
        references: {
            model: 'aprovacao',
            key: 'IDAPROVACAO'
        }
    },
    TEXTOANTERIOR: Sequelize.TEXT,
    TEXTODEPOIS: Sequelize.TEXT,
    DATAEDICAO: Sequelize.DATE
}, {
    timestamps: false,
    tableName: 'edicaocomentario'
});

EdicaoComentario.belongsTo(Comentario, { foreignKey: 'IDCOMENTARIO' });
EdicaoComentario.belongsTo(Aprovacao, { foreignKey: 'IDAPROVACAO' });



module.exports = EdicaoComentario;
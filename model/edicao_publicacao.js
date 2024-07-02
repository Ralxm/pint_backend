const Sequelize = require('sequelize');
const sequelize = require('./database');
const Post = require('./post');
const Aprovacao = require('./aprovacao');

const EdicaoPublicacao = sequelize.define('edicaopublicacao', {
    IDEDICAOPUBLICACAO: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    IDAPROVACAO: {
        type: Sequelize.INTEGER,
        references: {
            model: 'aprovacao',
            key: 'IDAPROVACAO'
        }
    },
    IDPUBLICACAO: {
        type: Sequelize.INTEGER,
        references: {
            model: 'post',
            key: 'IDPUBLICACAO'
        }
    },
    TITULOANTERIOR: Sequelize.TEXT,
    TITULODEPOIS: Sequelize.TEXT,
    TEXTOANTERIOR: Sequelize.TEXT,
    TEXTODEPOIS: Sequelize.TEXT,
    DATAEDICAO: Sequelize.DATE
}, {
    timestamps: false,
    tableName: 'edicaopublicacao'
});

EdicaoPublicacao.belongsTo(Aprovacao, { foreignKey: 'IDAPROVACAO' });
EdicaoPublicacao.belongsTo(Post, { foreignKey: 'IDPUBLICACAO' });



module.exports = EdicaoPublicacao;
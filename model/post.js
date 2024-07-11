const Sequelize = require('sequelize');
const sequelize = require('./database');
const Cidade = require('./cidade');
const Colaborador = require('./colaborador');
const Aprovacao = require('./aprovacao');
const Categoria = require('./categoria');
const Subcategoria = require('./subcategoria');
const Espaco = require('./espaco');
const Evento = require('./evento');

const Post = sequelize.define('post', {
    IDPUBLICACAO: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    CIDADE: {
        type: Sequelize.INTEGER,
        references: {
            model: 'cidade',
            key: 'IDCIDADE'
        }
    },
    APROVACAO: {
        type: Sequelize.INTEGER,
        references: {
            model: 'aprovacao',
            key: 'IDAPROVACAO'
        }
    },
    COLABORADOR: {
        type: Sequelize.INTEGER,
        references: {
            model: 'colaborador',
            key: 'IDCOLABORADOR'
        }
    },
    CATEGORIA: {
        type: Sequelize.INTEGER,
        references: {
            model: 'categoria',
            key: 'IDCATEGORIA'
        }
    },
    SUBCATEGORIA: {
        type: Sequelize.INTEGER,
        references: {
            model: 'subcategoria',
            key: 'IDSUBCATEGORIA'
        }
    },
    ESPACO: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
            model: 'espaco',
            key: 'IDESPACO'
        }
    },
    EVENTO: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
            model: 'evento',
            key: 'IDEVENTO'
        }
    },
    DATAPUBLICACAO: Sequelize.DATEONLY,
    DATAULTIMAATIVIDADE: Sequelize.DATEONLY,
    TITULO: Sequelize.STRING,
    TEXTO: Sequelize.STRING,
    RATING: Sequelize.FLOAT,
    IMAGEM: {
        type: Sequelize.BLOB('long'),
        allowNull: true
    }
{
timestamps: false,
tableName: 'post'
});

Post.belongsTo(Cidade, { foreignKey: 'CIDADE' });
Post.belongsTo(Aprovacao, { foreignKey: 'APROVACAO' });
Post.belongsTo(Colaborador, { foreignKey: 'COLABORADOR' });
Post.belongsTo(Categoria, { foreignKey: 'CATEGORIA' });
Post.belongsTo(Subcategoria, { foreignKey: 'SUBCATEGORIA' });
Post.belongsTo(Espaco, { foreignKey: 'ESPACO' });
Post.belongsTo(Evento, { foreignKey: 'EVENTO' });



module.exports = Post;
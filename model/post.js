const Sequelize = require('sequelize');
const sequelize = require('./database');
const Cidade = require('./cidade');
const Colaborador = require('./colaborador');
const Aprovacao = require('./aprovacao');
const Categoria = require('./categoria');
const Subcategoria = require('./subcategoria');
const Espaco = require('./espaco');
const Evento = require('./evento');
const Auditlog = require('./auditlog')

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
    },
    VIEWS: Sequelize.INTEGER
},
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

Post.afterCreate((post, option) =>{
    let tipo;
    let now = new Date();
    let dd = now.getDate();
    let mm = now.getMonth() + 1;
    let yyyy = now.getFullYear();
    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;
    let today = `${yyyy}-${mm}-${dd}`;

    if(post.ESPACO == 1){
        tipo = 'Criação de evento com ID: ' + post.EVENTO;
    }
    else if(post.EVENTO == 1){
        tipo = 'Criação de espaço com ID: ' + post.ESPACO;
    }
    return Auditlog.create({
        IDCONTA: post.COLABORADOR,
        TIPOATIVIDADE: tipo,
        DATA : today,
        DESCRICAO : post.colaborador.NOME + '{ID: ' + post.COLABORADOR + '} criou uma publicação'
    })
    .catch(err => {
        throw new Error(err);
    });
})

module.exports = Post;
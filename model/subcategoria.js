const Sequelize = require('sequelize');
const sequelize = require('./database');
const Categoria = require('./categoria');

const SubCategoria = sequelize.define('subcategoria', {
    IDSUBCATEGORIA: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    NOME: {
        type: Sequelize.STRING,
    },
    DESCRICAO: Sequelize.STRING,
    IDCATEGORIA: {
        type: Sequelize.INTEGER,
        references: {
            model: 'categoria',
            key: 'IDCATEGORIA'
        }
    }
}, {
    timestamps: false,
    tableName: 'subcategoria'
});

SubCategoria.belongsTo(Categoria, { foreignKey: 'IDCATEGORIA' });

module.exports = SubCategoria;
const Sequelize = require('sequelize');
const sequelize = require('./database');
const Cargo = require('./cargo');
const Permissoes = require('./permissoes');

const CargoPermissao = sequelize.define('cargo_permissao', {
    IDCARGOPERMISSAO: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    IDCARGO: {
        type: Sequelize.INTEGER,
        references: {
            model: 'cargo',
            key: 'IDCARGO'
        }
    },
    IDPERMISSAO: {
        type: Sequelize.INTEGER,
        references: {
            model: 'permissoes',
            key: 'IDPERMISSAO'
        }
    }
}, {
    timestamps: false,
    tableName: 'cargo_permissao'
});

CargoPermissao.belongsTo(Cargo, { foreignKey: 'IDCARGO' });
CargoPermissao.belongsTo(Permissoes, { foreignKey: 'IDPERMISSAO' });



module.exports = CargoPermissao;
const Sequelize = require('sequelize');
const sequelize = require('./database');
const bcrypt = require('bcrypt');
const Cidade = require('./cidade')
const ColaboradorCargo = require('./colaborador_cargo')

const Colaborador = sequelize.define('colaborador', {
    IDCOLABORADOR: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    EMAIL: Sequelize.STRING,
    PASSWORDCOLABORADOR: Sequelize.STRING,
    NOME: Sequelize.STRING,
    TELEMOVEL: {
        type: Sequelize.STRING,
        allowNull: true
    },
    CIDADE: {
        type: Sequelize.INTEGER,
        references: {
            model: 'cidade',
            key: 'IDCIDADE'
        }
    },
    DATANASCIMENTO: {
        type: Sequelize.DATEONLY,
        allowNull: true
    },
    DATAREGISTO: Sequelize.DATEONLY,
    ULTIMOLOGIN: Sequelize.DATEONLY,
    TIPOCONTA: Sequelize.INTEGER,
    IMAGEM: {
        type: Sequelize.BLOB('long'),
        allowNull: true
    }
},
{
timestamps: false,
tableName: 'colaborador'
});

Colaborador.belongsTo(Cidade, { foreignKey: 'CIDADE' });

Colaborador.beforeCreate((colaborador, options) =>{
    return bcrypt.hash(colaborador.PASSWORDCOLABORADOR, 10)
    .then(hash =>{
        colaborador.PASSWORDCOLABORADOR = hash;
    })
    .catch(err => {
        throw new Error();
    })
})

Colaborador.beforeUpdate((colaborador, options) => {
    return bcrypt.hash(colaborador.PASSWORDCOLABORADOR, 10)
        .then(hash => {
            colaborador.PASSWORDCOLABORADOR = hash;
        })
        .catch(err => {
            throw new Error();
        });
});

/*Colaborador.afterCreate((colaborador, option) =>{
    return ColaboradorCargo.create({
        IDCOLABORADOR: colaborador.IDCOLABORADOR,
        IDCARGO: 2
    })
    .catch(err => {
        throw new Error(err);
    });
})*/

module.exports = Colaborador;
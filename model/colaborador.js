const Sequelize = require('sequelize');
const sequelize = require('./database');
const bcrypt = require('bcrypt');
const Cidade = require('./cidade')
const Auditlog = require('./auditlog')

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
    },
    ATIVO: Sequelize.INTEGER,
    MUDOUPASSWORD: Sequelize.INTEGER,
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

Colaborador.afterCreate((colaborador, options) =>{
    let now = new Date();
    let dd = now.getDate();
    let mm = now.getMonth() + 1;
    let yyyy = now.getFullYear();
    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;
    let today = `${yyyy}-${mm}-${dd}`;

    return Auditlog.create({
        IDCONTA: colaborador.IDCOLABORADOR,
        TIPOATIVIDADE: 'Registo',
        DATA : today,
        DESCRICAO : colaborador.NOME + '{ID: ' + colaborador.IDCOLABORADOR + '} efetuou registo'
    })
    .catch(err => {
        throw new Error(err);
    });
})

/*Colaborador.afterUpdate((colaborador, options) => {
    return bcrypt.hash(colaborador.PASSWORDCOLABORADOR, 10)
        .then(hash => {
            colaborador.PASSWORDCOLABORADOR = hash;
        })
        .catch(err => {
            throw new Error();
        });
});*/

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
const Sequelize = require('sequelize');
const sequelize = require('./database');

const MudarPassword = sequelize.define('mudarpassword', {
    IDMUDARPASSWORD: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    EMAIL: Sequelize.STRING,
    CODIGO: Sequelize.STRING
},
{
timestamps: false,
tableName: 'mudarpassword'
});

module.exports = Aviso;
const Sequelize = require('sequelize');
const sequelize = require('./database');
const Post = require('./post');

const Espaco = sequelize.define('espaco', {
    IDESPACO: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    COORDENADAS: Sequelize.TEXT,
    WEBSITE: Sequelize.TEXT,
    PRECO:{
        type: Sequelize.FLOAT,
        allowNull: true,
    }
}, {
    timestamps: false,
    tableName: 'espaco'
});



module.exports = Espaco;
const Sequelize = require('sequelize');
const sequelize = require('./database');

const AuditLog = sequelize.define('auditlog', {
    LOGID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    IDCONTA: Sequelize.INTEGER,
    TIPOATIVIDADE: Sequelize.STRING,
    DATA: Sequelize.DATE,
    DESCRICAO: Sequelize.STRING
}, {
    timestamps: false,
    tableName: 'auditlog'
});



module.exports = AuditLog;
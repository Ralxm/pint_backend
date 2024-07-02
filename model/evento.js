const Sequelize = require('sequelize');
const sequelize = require('./database');
const Questionario = require('./questionario')

const Evento = sequelize.define('evento', {
    IDEVENTO: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    IDQUESTIONARIO: {
        type: Sequelize.INTEGER,
        references: {
            model: 'questionario',
            key: 'IDQUESTIONARIO'
        }
    },
}, {
    timestamps: false,
    tableName: 'evento'
});

Evento.belongsTo(Questionario, { foreignKey: 'IDQUESTIONARIO' })



module.exports = Evento;
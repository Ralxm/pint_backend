const Sequelize = require('sequelize');
const sequelize = require('./database');
const Cargo = require('./cargo');
const Colaborador = require('./colaborador');

const ColaboradorCargo = sequelize.define('colaborador_cargo', {
    IDCOLABORADORCARGO: {
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
    IDCOLABORADOR: {
        type: Sequelize.INTEGER,
        references: {
            model: 'colaborador',
            key: 'IDCOLABORADOR'
        }
    }
}, {
    timestamps: false,
    tableName: 'colaborador_cargo'
});

//ColaboradorCargo.belongsTo(Cargo, { foreignKey: 'IDCARGO' });
//ColaboradorCargo.belongsTo(Colaborador, { foreignKey: 'IDCOLABORADOR' });

module.exports = ColaboradorCargo;
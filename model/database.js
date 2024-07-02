var Sequelize = require('sequelize')

/*const sequelize = new Sequelize(
    'pint',
    'postgres',
    'postgres',
    {
        host: 'localhost',
        port: 5432,
        dialect: 'postgres'
    }
);*/

const sequelize = new Sequelize(
    'pint',
    'basedados_ieyi_user',
    'fEO8Nn8w39I81eIkPniLIpG2zr3XIMAs',
    {
        host: 'dpg-cq1vnajv2p9s73d9iubg-a.frankfurt-postgres.render.com',
        port: 5432,
        dialect: 'postgres',
        dialectOptions: {
        ssl: {
            require: true, // This will enforce the use of SSL
            rejectUnauthorized: false // This option bypasses hostname matching, certificate expiration and not yet valid checks.
        }
  }
    }
);

module.exports = sequelize;
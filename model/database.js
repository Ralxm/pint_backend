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
    'basedados_v8b5_user',
    'Uk7Mh0dKAQkFk8BxLiQ9VBdo6QXq260u',
    {
        host: 'dpg-cqqbvc3v2p9s73b585c0-a.frankfurt-postgres.render.com',
        port: 5432,
        dialect: 'postgres',
        dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
  }
    }
);

module.exports = sequelize;
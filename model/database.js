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
    'pintbd_jmg1_user',
    'ZevXzT9n34zg3BzqDAx0oWuAFwMm3xcH',
    {
        host: 'postgresql://mhr:hMiY0tKO3SJWW2k5vSZ1mGDngZcN0Yu6@dpg-d102sammcj7s7385buf0-a.frankfurt-postgres.render.com/mhr.frankfurt-postgres.render.com',
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

const Sequelize = require('sequelize');

const sequelize = new Sequelize(process.env.DEV_DB_NAME, process.env.DEV_DB_USERNAME, process.env.DEV_DB_PASSWORD, {
    host: process.env.DEV_DB_HOST,
    dialect: 'postgres',
    define: {
        timestamps: false
    },
    pool: {
        max : 5,
        min: 0,
        idle: 10000
    },
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.account = require('./components/account/accountModel')(sequelize, Sequelize);

module.exports = db;
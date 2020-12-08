const Sequelize = require('sequelize');

const sequelize = new Sequelize('WebDB', 'postgres', 'password', {
    host: 'localhost',
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
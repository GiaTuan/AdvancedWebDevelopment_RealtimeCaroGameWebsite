const Sequelize = require('sequelize');

const sequelize = new Sequelize(process.env.DEV_DB_NAME, process.env.DEV_DB_USERNAME, process.env.DEV_DB_PASSWORD, {
    host: process.env.DEV_DB_HOST,
    dialect: 'postgres',
    define: {
        timestamps: false
    },
  
    pool: {
      max: 5,
      min: 0,
      idle: 10000
    },
  });

  const db = {};
  db.Sequelize = Sequelize;
  db.sequelize = sequelize;

  db.account = require('./components/account/accountModel')(sequelize,Sequelize);
  db.game = require('./components/game/gameModel')(sequelize,Sequelize);
  db.gameUser = require('./components/game/gameUserModel')(sequelize,Sequelize);
  db.chat = require('./components/chat/chatModel')(sequelize,Sequelize);

  db.game.hasMany(db.gameUser, {
    foreignKey: 'idgame'
  });
  db.gameUser.belongsTo(db.game , {
    foreignKey: 'idgame'
  });

  db.account.hasMany(db.gameUser, {
    foreignKey: 'iduser'
  });
  db.gameUser.belongsTo(db.account , {
    foreignKey: 'iduser'
  });


  db.game.hasMany(db.chat, {
    foreignKey: 'idgame'
  });
  db.chat.belongsTo(db.game , {
    foreignKey: 'idgame'
  });

  db.account.hasMany(db.chat, {
    foreignKey: 'iduser'
  });
  db.chat.belongsTo(db.account , {
    foreignKey: 'iduser'
  });


  // db.account.hasMany(db.gameUser, {
  //   foreignKey: 'iduser'
  // });
  // db.gameUser.belongsTo(db.account , {
  //   foreignKey: 'iduser'
  // });

  module.exports = db;
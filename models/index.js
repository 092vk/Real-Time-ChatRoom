const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.name, process.env.user, process.env.password, {
  host: process.env.host,
  dialect: 'postgres',
  port: process.env.port
});

const db = {};
db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User = require('./user')(sequelize, DataTypes);
db.Room = require('./room')(sequelize, DataTypes);
db.Message = require('./message')(sequelize, DataTypes);

db.Room.hasMany(db.Message);
db.User.hasMany(db.Message);
db.Message.belongsTo(db.Room);
db.Message.belongsTo(db.User);

module.exports = db;

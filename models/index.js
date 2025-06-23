const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'postgres',
  port: process.env.DB_PORT
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

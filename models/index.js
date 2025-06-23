import { Sequelize, DataTypes } from 'sequelize';
import dotenv from 'dotenv';
import UserModel from './user.js';
import RoomModel from './room.js';
import MessageModel from './message.js';

dotenv.config();

const sequelize = new Sequelize(process.env.name, process.env.user, process.env.password, {
  host: process.env.host,
  dialect: 'postgres',
  port: process.env.port
});

const db = {};
db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User = UserModel(sequelize, DataTypes);
db.Room = RoomModel(sequelize, DataTypes);
db.Message = MessageModel(sequelize, DataTypes);

db.Room.hasMany(db.Message);
db.User.hasMany(db.Message);
db.Message.belongsTo(db.Room);
db.Message.belongsTo(db.User);

export default db;

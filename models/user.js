module.exports = (sequelize, DataTypes) => {
  return sequelize.define('User', {
    nickname: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    }
  });
}
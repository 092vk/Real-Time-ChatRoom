module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Message', {
    content: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  });
}
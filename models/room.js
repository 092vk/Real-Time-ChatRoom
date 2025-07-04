export default (sequelize, DataTypes) => {
  return sequelize.define('Room', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    }
  });
}
module.exports = function (sequelize, Sequelize) {
  const Country = sequelize.define('countries', {
    code: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
  }, { timestamps: false });
  return Country;
};

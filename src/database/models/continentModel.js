module.exports = (sequelize, Sequelize) => {
  const continentModel = sequelize.define('continents', {
    code: {
      type: Sequelize.STRING,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false,
    },
  });
  return continentModel;
};

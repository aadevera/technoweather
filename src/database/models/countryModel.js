module.exports = (sequelize, Sequelize) => {
  const countryModel = sequelize.define('countries', {
    country_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    code: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    full_name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    iso3: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false,
    },
    number: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false,
    },
    continent_code: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    display_order: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  });
  return countryModel;
};

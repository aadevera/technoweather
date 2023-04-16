module.exports = (sequelize, Sequelize) => {
  const cityModel = sequelize.define('cities', {
    id: {
      type: Sequelize.BIGINT,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    city: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    cityAscii: {
      field: 'city_ascii',
      type: Sequelize.STRING,
      allowNull: false,
    },
    lat: {
      type: Sequelize.DECIMAL(10, 4),
    },
    lng: {
      type: Sequelize.DECIMAL(10, 2),
    },
    country: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    iso2: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    iso3: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    adminName: {
      field: 'admin_name',
      type: Sequelize.STRING,
    },
    capital: {
      type: Sequelize.STRING,
    },
    population: {
      type: Sequelize.INTEGER,
    },
  });

  return cityModel;
};

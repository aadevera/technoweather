module.exports = function (sequelize, Sequelize) {
  const City = sequelize.define('cities', {
    id: {
      type: Sequelize.BIGINT,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    cityId: {
      field: 'city_id',
      type: Sequelize.STRING,
      allowNull: false,
    },
    cityName: {
      field: 'city_name',
      type: Sequelize.STRING,
      allowNull: false,
    },
    cityLocalName: {
      field: 'city_local_name',
      type: Sequelize.STRING,
      allowNull: false,
    },
    lat: {
      type: Sequelize.FLOAT,
    },
    lon: {
      type: Sequelize.FLOAT,
    },
    country: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    countryCode: {
      field: 'country_code',
      type: Sequelize.STRING,
      allowNull: false,
    },   
    
  }, { timestamps: false });

  return City;
};

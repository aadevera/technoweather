const { cities } = require('../database/models');

module.exports = {
  findAllCityByCountry: async function (countryCode) {
    try {
      const result = await cities.findAll({
        where: { countryCode },
        order: [['cityName', 'ASC']],
      });
      return { statusCode: 200, data: result };
    } catch (error) {
      console.log(error);
      throw new Error({ statusCode: 500, message: 'Internal Server Error.' });
    }
  },
};

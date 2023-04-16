const { cityModel } = require('src/database/models');

module.exports = {
  findAllCountries: async () => {
    try {
      return await cityModel.findAll({
        attributes: ['country'],
        group: ['country'],
        order: ['country', 'DESC'],
      });
    } catch (error) {
      console.log(error);
      throw new Error({ statusCode: 500, message: 'Internal Server Error.' });
    }
  },
  findAllCityByCountry: async (country) => {
    try {
      return await cityModel.findAll({
        where: { country },
        order: [['cityAscii', 'ASC']],
      });
    } catch (error) {
      console.log(error);
      throw new Error({ statusCode: 500, message: 'Internal Server Error.' });
    }
  },
};

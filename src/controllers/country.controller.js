const { countries } = require('../database/models');

module.exports = {
  getAllCountries: async function () {
    try {
      const result = await countries.findAll();
      return { statusCode: 200, data: result };
    } catch (error) {
      console.log(error);
      throw new Error({ statusCode: 500, message: 'Internal Server Error.' });
    }
  },
};

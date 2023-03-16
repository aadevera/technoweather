const { countryModel } = require('src/database/models');

module.exports = {
  getAll: async () => {
    return await countryModel.findAll();
  },
};

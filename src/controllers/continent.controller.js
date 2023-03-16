const { continentModel } = require('src/database/models');

module.exports = {
  getAll: async () => {
    return await continentModel.findAll();
  },
};

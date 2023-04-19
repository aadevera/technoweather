const { cityModel } = require('src/database/models');

module.exports = {
  getAll: async () => {
    return await cityModel.findAll({
      attributes: ['country'],
      group: ['country'],
      distinct: true,
    });
  },
};

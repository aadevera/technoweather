const { bookmarkModel, cityModel } = require('src/database/models');

module.exports = {
  findAllByUserID: async (userId) => {
    try {
      return await bookmarkModel.findAll({
        where: { userId },
        order: [['id', 'DESC']],
      });
    } catch (error) {
      console.log(error);
      throw new Error({ statusCode: 500, message: 'Internal Server Error.' });
    }
  },
  create: async (userId, { lat, lon, name = 'unknown' }) => {
    try {
      const isExisting = await bookmarkModel.findOne({
        where: { userId, lat, lon },
      });

      if (isExisting) {
        return {
          statusCode: 400,
          message: 'Location already bookmarked.',
        };
      }

      const bookmarkCount = await bookmarkModel.count();
      if (bookmarkCount >= 5) {
        return {
          statusCode: 400,
          message: 'Max bookmarks reached.',
        };
      }

      await bookmarkModel.create({ userId, lat, lon, name });
      return { statusCode: 200, message: 'Bookmark successfully created.' };
    } catch (error) {
      console.log(error);
      throw new Error({ statusCode: 500, message: 'Internal Server Error.' });
    }
  },
  delete: async (userId, bookmarkId) => {
    try {
      await bookmarkModel.destroy({
        where: { userId, id: bookmarkId },
      });
      return { statusCode: 200, message: 'Bookmark successfully deleted' };
    } catch (error) {
      console.log(error);
      throw new Error({ statusCode: 500, message: 'Internal Server Error.' });
    }
  },
};

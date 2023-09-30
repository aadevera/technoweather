const { bookmarks } = require('../database/models');

module.exports = {
  findAllByUserID: async function (userId) {
    // the user id is passed from the route
    try {
      const result = await bookmarks.findAll({
        where: { userId },
        order: [['id', 'DESC']],
      });

      return { statusCode: 200, data: result };
    } catch (error) {
      console.log(error);
      throw new Error({ statusCode: 500, message: 'Internal Server Error.' });
    }
  },
  create: async function ({ userId, lat, lon, name }) {
    try {
      const isExisting = await bookmarks.findOne({
        where: { userId, lat, lon },
      });

      if (isExisting) {
        return {
          statusCode: 400,
          message: 'Location already bookmarked.',
        };
      }

      const bookmarkCount = await bookmarks.count();
      if (bookmarkCount >= 5) {
        return {
          statusCode: 400,
          message: 'Max bookmarks reached.',
        };
      }

      await bookmarks.create({ userId, lat, lon, name });
      return { statusCode: 200, message: 'Bookmark successfully created.' };
    } catch (error) {
      console.log(error);
      throw new Error({ statusCode: 500, message: 'Internal Server Error.' });
    }
  },
  delete: async function (userId, bookmarkId) {
    try {
      await bookmarks.destroy({
        where: { userId, id: bookmarkId },
      });
      return { statusCode: 200, message: 'Bookmark successfully deleted' };
    } catch (error) {
      console.log(error);
      throw new Error({ statusCode: 500, message: 'Internal Server Error.' });
    }
  },
};

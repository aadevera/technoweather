module.exports = function (sequelize, Sequelize) {
  const Bookmark = sequelize.define('bookmarks', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    userId: {
      field: 'user_id',
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    lat: {
      type: Sequelize.FLOAT,
      allowNull: false,
    },
    lon: {
      type: Sequelize.FLOAT,
      allowNull: false,
    },
    name: {
      type: Sequelize.STRING,
    },
  }, { timestamps: false });

  return Bookmark;
};

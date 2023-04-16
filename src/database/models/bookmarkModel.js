module.exports = (sequelize, Sequelize) => {
  const bookmarkModel = sequelize.define('bookmarks', {
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
      type: Sequelize.DECIMAL(10, 4),
      allowNull: false,
    },
    lon: {
      type: Sequelize.DECIMAL(10, 4),
      allowNull: false,
    },
    name: {
      type: Sequelize.STRING,
    },
  });

  return bookmarkModel;
};

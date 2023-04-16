require('dotenv').config();
const config = require('src/config/db.config');

const Sequelize = require('sequelize');

const sequelize = new Sequelize(config);
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

/**
 * Models
 */
db.continentModel = require('./continentModel.js')(sequelize, Sequelize);
db.countryModel = require('./countryModel.js')(sequelize, Sequelize);
db.userModel = require('./userModel.js')(sequelize, Sequelize);
db.cityModel = require('./cityModel.js')(sequelize, Sequelize);
db.bookmarkModel = require('./bookmarkModel.js')(sequelize, Sequelize);

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

module.exports = db;

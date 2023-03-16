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

module.exports = db;

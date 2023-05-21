if (process.env.NODE_ENV === 'dev') {
  require('dotenv').config();
}

const {
  SEQUELIZE_DIALECT,
  SEQUELIZE_USERNAME,
  SEQUELIZE_PASSWORD,
  SEQUELIZE_HOST,
  SEQUELIZE_PORT,
  SEQUELIZE_DB,
} = process.env;

module.exports = {
  dialect: SEQUELIZE_DIALECT,
  username: SEQUELIZE_USERNAME,
  password: SEQUELIZE_PASSWORD,
  host: SEQUELIZE_HOST,
  port: SEQUELIZE_PORT,
  database: SEQUELIZE_DB,
  logging: false,
};

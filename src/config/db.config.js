require('dotenv').config();

const DB = process.env.MYSQL_DB || 'technoweather';
const USERNAME = process.env.MYSQL_USERNAME || 'root';
const PASSWORD = process.env.MYSQL_PASSWORD || 'root';
const DIALECT = process.env.MYSQL_DIALECT || 'mysql';
const HOST = process.env.HOST || 'localhost';

module.exports = {
  database: DB,
  username: USERNAME,
  password: PASSWORD,
  host: HOST,
  dialect: DIALECT,
  logging: false,
  define: {
    timestamps: false,
  },
};

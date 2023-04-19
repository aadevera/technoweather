if (process.env.NODE_ENV === 'dev') {
  require('dotenv').config();
}

const DB = process.env.MYSQL_DB;
const USERNAME = process.env.MYSQL_USERNAME;
const PASSWORD = process.env.MYSQL_PASSWORD;
const DIALECT = process.env.MYSQL_DIALECT;
const HOST = process.env.MYSQL_HOST;

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

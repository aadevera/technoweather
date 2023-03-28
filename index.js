// initialize environmental variables
require('dotenv').config();

// imports
const express = require('express');
const { authRoute, countryRoute, continentRoute } = require('src/routes');
const morgan = require('morgan');

// constants
const app = express();
const port = process.env.PORT || '3000';
const host = process.env.HOST || 'localhost';

// middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(morgan('dev'));

// database
const db = require('src/database/models');
db.sequelize
  .sync()
  .then(() => {
    console.log('Database is synced.');
  })
  .catch((err) => {
    console.log('Failed to sync database: ' + err.message);
  });

app.use('/auth', authRoute);
app.use('/countries', countryRoute);
app.use('/continents', continentRoute);

// 404
app.use((req, res) => {
  res.status(404).json({ message: 'page not found' });
});

app.listen(port, host, () => {
  console.log(`Server running at ${host}:${port}`);
});

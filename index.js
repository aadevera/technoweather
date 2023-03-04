// initialize environmental variables
require('dotenv').config();

// imports
const express = require('express');

// constants
const app = express();
const port = process.env.PORT || '3000';
const host = process.env.HOST || 'localhost';

// middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/', require('src/routes')(express.Router()));

app.listen(port, host, () => {
  console.log(`Server running at ${host}:${port}`);
});

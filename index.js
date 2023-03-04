require('dotenv').config();

const express = require('express');
const app = express();
const port = process.env.PORT || '3000';
const host = process.env.HOST || 'localhost';

app.listen(port, host, () => {
  console.log(`Server running at ${host}:${port}`);
});

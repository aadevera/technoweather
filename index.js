// initialize environmental variables
if (process.env.NODE_ENV === 'dev') {
  require('dotenv').config();
}

// imports
const express = require('express');
const session = require('express-session');
// const flash = require('connect-flash')
const morgan = require('morgan');
morgan.token('body', function (req, res) {
  const method = req.method.toLowerCase();
  if (method === 'post' || method === 'patch' || method === 'put') {
    return JSON.stringify(req.body);
  }
});

const {
  authRoute,
  countryRoute,
  continentRoute,
  bookmarkRoute,
  cityRoute,
  weatherRoute,
} = require('src/routes');

// constants
const app = express();
const port = process.env.SERVER_PORT || '3000';
const host = process.env.SERVER_HOST || 'localhost';
const NODE_ENV = process.env.NODE_ENV;
const APP_URL =
  NODE_ENV === 'dev' ? 'http://localhost:3000' : process.env.APP_URL;

// middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  session({
    secret: 'sessionsecret',
    resave: true,
    saveUninitialized: true,
  })
);
app.use(express.static('public'));
app.use(
  morgan(':method :url :body :status :response-time ms - :res[content-length]')
);

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

// views
app.set('views', 'src/views');
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.redirect('/home');
});

app.use('/home', (req, res) => {
  res.render('index', { user: req.session.user, APP_URL });
});

// routes
app.use('/api/auth', authRoute);
app.use('/api/countries', countryRoute);
app.use('/api/continents', continentRoute);
app.use('/api/bookmarks', bookmarkRoute);
app.use('/api/cities', cityRoute);
app.use('/api/weather', weatherRoute);
// 404
app.use((req, res) => {
  res.status(404).json({ message: 'page not found' });
});

app.listen(port, host, () => {
  console.log(`Server running at ${host}:${port}`);
});

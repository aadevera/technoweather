const { continentController, countryController } = require('src/controllers');

module.exports = (router) => {
  router.get('/', (req, res) => {
    res.send({
      message: 'Welcome to technoweather api by TechnoKids',
    });
  });

  router.get('/continents', async (req, res) => {
    const response = await continentController.getAll();
    return res.json(response);
  });

  router.get('/countries', async (req, res) => {
    const response = await countryController.getAll();
    return res.json(response);
  });

  return router;
};

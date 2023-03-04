// routes
module.exports = (router) => {
  router.get('/', (req, res) => {
    res.send({
      message: 'Welcome to technoweather api by TechnoKids',
    });
  });

  return router;
};

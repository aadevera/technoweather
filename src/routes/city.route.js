const { cityController } = require('src/controllers');
const { authMiddleware } = require('src/middlewares');
const router = require('express').Router();

router.use(authMiddleware.verifyToken);

// router.get('/countries', async (req, res) => {
//   const response = await cityController.findAllCountries();
//   return res.json(response);
// });

router.get('/:country', async (req, res) => {
  const { country } = req.params;
  const response = await cityController.findAllCityByCountry(country);
  return res.json(response);
});

module.exports = router;

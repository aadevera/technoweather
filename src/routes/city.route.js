const { cityController } = require('../controllers');
const {
  verifyToken,
  //verifySession,
} = require('../middlewares/auth.middleware');
const router = require('express').Router();

router.use(verifyToken);
//router.use(verifySession);

router.get('/:countryCode', async (req, res) => {
  const { countryCode } = req.params;
  const response = await cityController.findAllCityByCountry(countryCode);
  return res.status(response.statusCode).json(response.data);
});

module.exports = router;

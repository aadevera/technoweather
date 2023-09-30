const { countryController } = require('../controllers');
const {
  verifyToken,
  //verifySession,
} = require('../middlewares/auth.middleware');
const router = require('express').Router();

router.use(verifyToken);
// router.use(verifySession);

router.get('/', async (req, res) => {
  const response = await countryController.getAllCountries();
  return res.status(response.statusCode).json(response.data);
});

module.exports = router;

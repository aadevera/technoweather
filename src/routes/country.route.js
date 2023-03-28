const { countryController } = require('src/controllers');
const { authMiddleware } = require('src/middlewares');
const router = require('express').Router();

router.use(authMiddleware.verifyToken);

router.get('/', async (req, res) => {
  const response = await countryController.getAll();
  return res.json(response);
});

module.exports = router;

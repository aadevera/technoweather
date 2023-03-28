const { authController } = require('src/controllers');
const router = require('express').Router();

router.post('/login', async (req, res) => {
  const { statusCode, ...response } = await authController.login(req, res);
  return res.status(statusCode).json(response);
});

router.post('/register', async (req, res) => {
  const { statusCode, ...response } = await authController.register(req, res);
  return res.status(statusCode).json(response);
});

module.exports = router;

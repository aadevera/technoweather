const { authController } = require('src/controllers');
const router = require('express').Router();

router.post('/login', async (req, res) => {
  const { statusCode, ...response } = await authController.login(req, res);

  return res.status(statusCode).json(response);
});

router.post('/signup', async (req, res) => {
  const { statusCode, ...response } = await authController.register(req, res);
  return res.status(statusCode).json(response);
});

router.post('/logout', async (req, res) => {
  req.session.destroy(function (err) {
    if (err) {
      return res.status(500).json(err);
    }
    return res.status(200).json({ message: 'Logout Successful' });
  });
});

module.exports = router;

const { authController } = require('../controllers');
const router = require('express').Router();
const {
  verifyToken,
  verifySession,
} = require('../middlewares/auth.middleware');

router.post('/register', async function (req, res) {
  const { statusCode, ...response } = await authController.register(req, res);
  return res.status(statusCode).json(response);
});

router.post('/login', async function (req, res) {
  const { statusCode, ...response } = await authController.login(req, res);
  return res.status(statusCode).json(response);
});

router.post('/logout', [verifyToken, verifySession], async function (req, res) {
  req.session.destroy(function (err) {
    if (err) {
      return res.status(500).json(err);
    }
    return res.status(200).json({ message: 'Logout Successful' });
  });
});

module.exports = router;

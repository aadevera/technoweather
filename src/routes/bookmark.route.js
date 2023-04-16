const { bookmarkController } = require('src/controllers');
const { authMiddleware } = require('src/middlewares');
const router = require('express').Router();

router.use(authMiddleware.verifyToken);

router.get('/', async (req, res) => {
  const { id: userId } = req.session.user;
  const response = await bookmarkController.findAllByUserID(userId);
  return res.json(response);
});

router.post('/create', async (req, res) => {
  const { id: userId } = req.session.user;
  const response = await bookmarkController.create(userId, req.body);
  return res.status(response.statusCode).json(response);
});

router.post('/delete/:id', async (req, res) => {
  const { id: userId } = req.session.user;
  const { id: bookmarkId } = req.params;
  const response = await bookmarkController.delete(userId, bookmarkId);
  return res.status(response.statusCode).json(response);
});

module.exports = router;

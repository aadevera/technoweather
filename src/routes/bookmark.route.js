const { bookmarkController } = require('../controllers');
const {
  verifyToken,
  //verifySession,
} = require('../middlewares/auth.middleware');
const router = require('express').Router();

router.use(verifyToken);
//router.use(verifySession);

router.get('/', async function (req, res) {
  req.session.reload(function () {});
  const { id: userId } = req.session.user;
  const response = await bookmarkController.findAllByUserID(userId);
  return res.status(response.statusCode).json(response.data);
});

router.post('/create', async function (req, res) {
  req.session.reload(function () {});
  const { id: userId } = req.session.user;
  // spread operator let a = {p1: 1, p2: 2}
  // let spread = {...a} = {p1:1, p2:2}
  const response = await bookmarkController.create({ userId, ...req.body });
  return res.status(response.statusCode).json(response);
});

router.delete('/delete/:id', async function (req, res) {
  req.session.reload(function () {});
  const { id: userId } = req.session.user;
  const { id: bookmarkId } = req.params;
  const response = await bookmarkController.delete(userId, bookmarkId);
  return res.status(response.statusCode).json(response);
});

module.exports = router;

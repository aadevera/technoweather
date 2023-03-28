const jwt = require('jsonwebtoken');
const { userModel } = require('src/database/models');
const TOKENSECRET = process.env.TOKENSECRET;

const verifyToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader)
    return res.status(403).json({ message: 'invalid/missing token' });

  try {
    const bearerToken = authHeader.split(' ')[1];
    const decoded = jwt.verify(bearerToken, TOKENSECRET);

    const { username, email } = decoded.data;
    const user = await userModel.findOne({ where: { username, email } });

    if (!user)
      return res.status(403).json({ message: 'invalid/missing token' });

    next();
  } catch (error) {
    console.info(error);
    switch (error.name) {
      case 'JsonWebTokenError':
      case 'TokenExpiredError':
      case 'NotBeforeError':
        return res.status(403).json({ message: 'invalid/missing token' });
      default:
        return res.status(500).json({ message: 'internal server error' });
    }
  }
};

module.exports = { verifyToken };

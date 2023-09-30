const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { users } = require('src/database/models');
const { Op } = require('sequelize');

module.exports = {
  login: async (req, res) => {
    const { email, password } = req.body;

    try {
      let user = await users.findOne({ where: { email }, plain: true });

      if (user) {
        const verifyPassword = await bcrypt.compare(password, user.password);

        if (!verifyPassword) {
          return { statusCode: 401, message: 'incorrect username/password' };
        }

        const TOKENSECRET = process.env.TOKENSECRET;

        const data = user.toJSON();
        delete data.password;

        const token = jwt.sign({ data }, TOKENSECRET, { expiresIn: '1h' });

        req.session.user = data;
        req.session.save();

        return {
          statusCode: 200,
          message: 'login successful!',
          token,
        };
      }

      return {
        statusCode: 401,
        message: 'incorrect username/password',
      };
    } catch (error) {
      console.log(error);
      return { statusCode: 500, message: 'internal server error' };
    }
  },
  register: async (req, res) => {
    const { username, password, confirmPassword, email } = req.body;

    if (!username) return { statusCode: 401, message: 'Username is required.' };
    if (!password) return { statusCode: 401, message: 'Password is required.' };
    if (!confirmPassword)
      return { statusCode: 401, message: 'Confirm Password is required.' };
    if (!email) return { statusCode: 401, message: 'Email is required.' };

    try {
      let findUser = await users.findOne({
        where: { [Op.or]: [{ username }, { email }] },
      });

      if (findUser) {
        return { statusCode: 401, message: 'User Already Exists.' };
      }

      if (password !== confirmPassword)
        return { statusCode: 401, message: 'Passwords do not match.' };

      const SALT_ROUNDS = parseInt(process.env.BCRYPT_SALT_ROUNDS);
      const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
      await users.create({ username, password: hashedPassword, email });

      return { statusCode: 200, message: 'Sign Up Successful!' };
    } catch (error) {
      console.log(error);
      return { statusCode: 500, message: 'internal server error' };
    }
  },
};

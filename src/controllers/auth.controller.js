const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { userModel } = require('src/database/models');

module.exports = {
  login: async (req, res) => {
    const { username, password } = req.body;

    try {
      let user = await userModel.findOne({ where: { username }, plain: true });

      if (user) {
        const verifyPassword = await bcrypt.compare(password, user.password);

        if (!verifyPassword) {
          return { statusCode: 401, message: 'incorrect username/password' };
        }

        const TOKENSECRET = process.env.TOKENSECRET;

        const data = user.toJSON();
        delete data.password;
        delete data.id;

        const token = jwt.sign({ data }, TOKENSECRET, { expiresIn: '1h' });

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

    try {
      let findUser = await userModel.findOne({ where: { username, email } });

      if (findUser) {
        return { statusCode: 401, message: 'user already exists.' };
      }

      if (password !== confirmPassword)
        return { statusCode: 401, message: 'passwords do not match.' };

      const SALT_ROUNDS = parseInt(process.env.BCRYPT_SALT_ROUNDS);
      const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
      await userModel.create({ username, password: hashedPassword, email });

      return { statusCode: 200, message: 'user successfully created!' };
    } catch (error) {
      console.log(error);
      return { statusCode: 500, message: 'internal server error' };
    }
  },
};
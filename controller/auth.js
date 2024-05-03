import UsersModel from '../model/users.js';
import { compare } from 'bcrypt';
import jwt from 'jsonwebtoken';
const secretKey = 'your_secret_key';

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UsersModel.getByEmail(email);

    if (!user || !(await compare(password, user.password))) {
      return res.status(401).json({
        status: 401,
        error: "User don't match email and password",
      });
    }
    const payload = {
      sub: user._id,
      iat: Math.floor(Date.now() / 1000) - 10,
      exp: Math.floor(Date.now() / 1000) + 8 * 60 * 60,
    };
    const token = jwt.sign(payload, secretKey);
    return res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 500, error: 'Internal Server Error' });
  }
};

export default {
  login,
};

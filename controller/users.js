import UserModel from '../model/users.js';
import { check, validationResult } from 'express-validator';
import { generateHash } from '../utils/auth.js';

const getAll = async (req, res) => {
  try {
    const users = await UserModel.getAll();
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 500, error: 'Internal Server Error' });
  }
};

const getById = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await UserModel.getById(userId);
    console.log(user);
    if (!user) {
      return res.status(404).json({ status: 404, error: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 500, error: 'Internal Server Error' });
  }
};

const create = [
  check('email')
    .notEmpty()
    .withMessage('Email cannot be empty')
    .isEmail()
    .withMessage('Must be a valid email'),
  check('password')
    .notEmpty()
    .withMessage('Password cannot be empty')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)
    .withMessage(
      'Password must include numbers, uppercase and lowercase letters, no special characters allowed',
    ),
  check('admin')
    .notEmpty()
    .withMessage('Admin cannot be empty')
    .isBoolean()
    .withMessage('Admin field must be boolean'),

  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { email, password, admin } = req.body;
      console.log('req', req.body);
      const existingUser = await UserModel.getByEmail(email);

      if (existingUser) {
        return res
          .status(400)
          .json({ status: 400, error: 'Email already exists' });
      }

      await UserModel.create({
        admin,
        email,
        password: await generateHash(password),
      });
      return res.status(201).json({ status: 201, message: 'User Created' });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ status: 500, error: 'Internal Server Error' });
    }
  },
];

export default {
  getAll,
  getById,
  create,
};

import { Schema, model } from 'mongoose';

const userSchema = new Schema(
  {
    name: {
      required: true,
      type: String,
      unique: true,
    },
    email: {
      required: true,
      type: String,
      unique: true,
    },
    password: {
      required: true,
      type: String,
    },
    admin: {
      required: true,
      type: Boolean,
    },
  },
  { timestamps: true },
);

const UserModel = model('users', userSchema);

const getAll = async () => {
  return UserModel.find({});
};

const getById = async (id) => {
  return UserModel.findById(id);
};

const create = async (userData) => {
  const newUser = new UserModel(userData);
  return newUser.save();
};

const updateById = async (id, userData) => {
  return UserModel.findByIdAndUpdate(id, userData, { new: true });
};

const deleteById = async (id) => {
  return UserModel.findByIdAndDelete(id);
};

const getByEmail = async (email) => {
  return UserModel.findOne({ email });
};

export default {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
  getByEmail,
};

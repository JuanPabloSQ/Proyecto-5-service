import { Schema, model } from 'mongoose';

const institutionSchema = new Schema(
  {
    name: {
      required: true,
      type: String,
    },
    image: {
      required: true,
      type: String,
    },
  },
  { timestamps: true },
);

const InstitutionModel = model('institutions', institutionSchema);

const getAll = async () => {
  return InstitutionModel.find({});
};

const getById = async (id) => {
  return InstitutionModel.findById(id);
};

const getByIds = async (ids) => {
  return InstitutionModel.find({ _id: { $in: ids } });
};

const create = async (institutionData) => {
  const newInstitution = new InstitutionModel(institutionData);
  return newInstitution.save();
};

const updateById = async (id, institutionData) => {
  return InstitutionModel.findByIdAndUpdate(id, institutionData, { new: true });
};

const deleteById = async (id) => {
  return InstitutionModel.findByIdAndDelete(id);
};

export default {
  getAll,
  getById,
  getByIds,
  create,
  updateById,
  deleteById,
};

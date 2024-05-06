import { Schema, model } from 'mongoose';

const plantSchema = new Schema(
  {
    name: {
      required: true,
      type: String,
    },
    image: {
      required: true,
      type: String,
    },
    price: {
      required: true,
      type: Number,
    },
  },
  { timestamps: true },
);

const PlantModel = model('plants', plantSchema);

const getAll = async () => {
  return PlantModel.find({});
};

const getById = async (id) => {
  return PlantModel.findById(id);
};

const getByIds = async (ids) => {
  return PlantModel.find({ _id: { $in: ids } });
};

const create = async (plantData) => {
  console.log('plantdata', plantData);
  const newPlant = new PlantModel(plantData);
  console.log('plantmodel', newPlant);
  return newPlant.save();
};

const updateById = async (id, plantData) => {
  return PlantModel.findByIdAndUpdate(id, plantData, { new: true });
};

const deleteById = async (id) => {
  return PlantModel.findByIdAndDelete(id);
};

export default {
  getAll,
  getById,
  getByIds,
  create,
  updateById,
  deleteById,
};

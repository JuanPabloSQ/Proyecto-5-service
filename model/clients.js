import { Schema, model } from 'mongoose';

const clientSchema = new Schema(
  {
    name: {
      required: true,
      type: String,
    },
    lastname: {
      required: true,
      type: String,
    },
    image: {
      required: function () {
        return typeof this.image !== 'string';
      },
      type: String,
    },
    rut: {
      required: true,
      type: String,
    },
    sex: {
      required: true,
      type: String,
    },
    weight: {
      required: true,
      type: Number,
    },
    height: {
      required: true,
      type: Number,
    },
    muscleMass: {
      required: true,
      type: Number,
    },
    fat: {
      required: true,
      type: Number,
    },
    fatPercent: {
      required: true,
      type: Number,
    },
    institutionId: {
      required: true,
      type: Schema.Types.ObjectId,
    },
    physicalActivity: {
      required: true,
      type: Number,
    },
    birthdate: {
      required: true,
      type: String,
    },
    physicalMetricHistoric: [
      {
        date: {
          required: true,
          type: String,
        },
        height: {
          required: true,
          type: Number,
        },
        weight: {
          required: true,
          type: Number,
        },
        fat: {
          required: true,
          type: Number,
        },
        fatPercent: {
          required: true,
          type: Number,
        },
        physicalActivity: {
          required: true,
          type: Number,
        },
        muscleMass: {
          required: true,
          type: Number,
        },
      },
    ],
    physicalActivityHistoric: [
      {
        date: {
          required: true,
          type: String,
        },
        navette: {
          required: true,
          type: Number,
        },
        distanceCN: {
          required: true,
          type: Number,
        },
        flexibility: {
          required: true,
          type: Number,
        },
        sitUps: {
          required: true,
          type: Number,
        },
      },
    ],
    physicalStrengthTestHistoric: [
      {
        date: {
          type: String,
          required: true,
        },
        elevation: {
          serie1: {
            type: Number,
            required: true,
          },
          serie2: {
            type: Number,
            required: true,
          },
        },
        pushUps: {
          serie1: {
            type: Number,
            required: true,
          },
          serie2: {
            type: Number,
            required: true,
          },
        },
        sitUps: {
          serie1: {
            type: Number,
            required: true,
          },
          serie2: {
            type: Number,
            required: true,
          },
        },
        isometricPlankSeconds: {
          type: Number,
          required: true,
        },
      },
    ],
  },
  { timestamps: true },
);
const ClientModel = model('clients', clientSchema);

const getAll = async () => {
  return ClientModel.find({});
};

const getById = async (id) => {
  return ClientModel.findById(id);
};

const deleteById = async (id) => {
  return ClientModel.findByIdAndDelete(id);
};

const create = async (clientData) => {
  const newClient = new ClientModel(clientData);
  return newClient.save();
};

const updateById = async (id, clientData) => {
  return ClientModel.findByIdAndUpdate(id, clientData, { new: true });
};

const getClientsByInstitutionId = async (institutionId) => {
  return ClientModel.find({ institutionId });
};

export default {
  getAll,
  getById,
  deleteById,
  create,
  updateById,
  getClientsByInstitutionId,
};

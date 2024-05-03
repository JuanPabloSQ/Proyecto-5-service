import InstitutionModel from '../model/institutions.js';
import ClientModel from '../model/clients.js';
import UserModel from '../model/users.js';

const getAll = async (req, res) => {
  try {
    const userIds = req.user.sub;
    const user = await UserModel.getById(userIds);
    const institutions = await InstitutionModel.getByIds(user.institutions);
    res.status(200).json({ status: 200, data: institutions });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 500, error: 'Internal Server Error' });
  }
};

const getById = async (req, res) => {
  try {
    const institutionId = req.params.id;
    const Institution = await InstitutionModel.getById(institutionId);
    console.log(Institution);
    if (!Institution) {
      return res
        .status(404)
        .json({ status: 404, error: 'Institution not found' });
    }
    res.status(200).json(Institution);
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 500, error: 'Internal Server Error' });
  }
};

const getClientsByInstitution = async (req, res) => {
  try {
    const institutionId = req.params.id;
    const clients = await ClientModel.getClientsByInstitutionId(institutionId);
    console.log(clients, institutionId);

    res.status(200).json({ status: 200, data: clients });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 500, error: 'Internal Server Error' });
  }
};

export default {
  getAll,
  getById,
  getClientsByInstitution,
};

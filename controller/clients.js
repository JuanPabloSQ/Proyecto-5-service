import ClientModel from '../model/clients.js';
import multer from 'multer';

const getAll = async (req, res) => {
  try {
    const clients = await ClientModel.getAll();
    res.status(200).json({ status: 200, data: clients });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 500, error: 'Internal Server Error' });
  }
};

const create = async (req, res) => {
  try {
    const clientData = req.body.data;

    const createdClient = await ClientModel.create(clientData);

    res.status(200).json({
      status: 200,
      data: createdClient,
    });
  } catch (error) {
    console.error('Error creating client:', error);
    res.status(500).json({
      status: 500,
      error: 'Internal Server Error',
    });
  }
};

const deleteClient = async (req, res) => {
  try {
    const clientId = req.params.id;
    const deletedClient = await ClientModel.deleteById(clientId);

    if (!deletedClient) {
      return res.status(404).json({ status: 404, data: 'Client not found' });
    }

    res.status(200).json({ status: 200, data: 'Client deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 500, error: 'Internal Server Error' });
  }
};

const updateClient = async (req, res) => {
  try {
    const clientId = req.params.id;
    const clientData = req.body.data;

    const existingClient = await ClientModel.getById(clientId);

    if (!existingClient) {
      return res.status(404).json({ status: 404, message: 'Client not found' });
    }

    const updatedClient = await ClientModel.updateById(clientId, clientData);

    res.status(200).json({ status: 200, data: updatedClient });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 500, error: 'Internal Server Error' });
  }
};

const updateClientImage = (req, res, next) => {
  const imageDir = 'uploads/clients/images';

  const upload = multer({
    storage: multer.diskStorage({
      destination: imageDir,
      filename: (req, file, cb) => cb(null, `${req.params.id}.png`),
    }),
    limits: { fileSize: 1000 * 1000 * 10 },
    fileFilter: (req, file, cb) => {
      if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
        return res.status(500).json({ status: 500, error: 'File Format not allowed' })
      }
      cb(undefined, true);
    }
  }).single('file');

  upload(req, res, async (err) => {
    if (err) 
      return res.status(500).json({ status: 500, error: 'Internal Server Error' });

    updateClient({ ...req, body: { data: { image: `/${imageDir}/${req.params.id}.png` }} }, res, next);
  });
}

export default {
  create,
  deleteClient,
  getAll,
  updateClient,
  updateClientImage,
};

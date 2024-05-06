import PlantModel from '../model/plants.js';
import multer from 'multer';

const getAll = async (req, res) => {
  try {
    const clients = await PlantModel.getAll();
    res.status(200).json({ status: 200, data: clients });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 500, error: 'Internal Server Error' });
  }
};

const getById = async (req, res) => {
  try {
    const plantId = req.params.id;
    const Plant = await PlantModel.getById(plantId);
    console.log(Plant);
    if (!Plant) {
      return res.status(404).json({ status: 404, error: 'Plant not found' });
    }
    res.status(200).json(Plant);
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 500, error: 'Internal Server Error' });
  }
};

const create = async (req, res) => {
  try {
    const plantData = req.body.data;

    const createdPlant = await PlantModel.create(plantData);

    res.status(200).json({
      status: 200,
      data: createdPlant,
    });
  } catch (error) {
    console.error('Error creating plant:', error);
    res.status(500).json({
      status: 500,
      error: 'Internal Server Error',
    });
  }
};

const deletePlant = async (req, res) => {
  try {
    const plantId = req.params.id;
    const deletedPlant = await PlantModel.deleteById(plantId);

    if (!deletedPlant) {
      return res.status(404).json({ status: 404, data: 'Plant not found' });
    }

    res.status(200).json({ status: 200, data: 'Plant deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 500, error: 'Internal Server Error' });
  }
};

const updatePlant = async (req, res) => {
  try {
    const plantId = req.params.id;
    const plantData = req.body.data;

    const existingPlant = await PlantModel.getById(plantId);

    if (!existingPlant) {
      return res.status(404).json({ status: 404, message: 'Client not found' });
    }

    const updatedPlant = await PlantModel.updateById(plantId, plantData);

    res.status(200).json({ status: 200, data: updatedPlant });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 500, error: 'Internal Server Error' });
  }
};

const updatePlantImage = (req, res, next) => {
  const imageDir = 'uploads/plant/images';

  const upload = multer({
    storage: multer.diskStorage({
      destination: imageDir,
      filename: (req, file, cb) => cb(null, `${req.params.id}.png`),
    }),
    limits: { fileSize: 1000 * 1000 * 10 },
    fileFilter: (req, file, cb) => {
      if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
        return res
          .status(500)
          .json({ status: 500, error: 'File Format not allowed' });
      }
      cb(undefined, true);
    },
  }).single('file');

  upload(req, res, async (err) => {
    if (err)
      return res
        .status(500)
        .json({ status: 500, error: 'Internal Server Error' });

    updatePlant(
      {
        ...req,
        body: { data: { image: `/${imageDir}/${req.params.id}.png` } },
      },
      res,
      next,
    );
  });
};

export default {
  getAll,
  getById,
  create,
  deletePlant,
  updatePlant,
  updatePlantImage,
};

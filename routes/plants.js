import { Router } from 'express';
import PlantsController from '../controller/plants.js';
import { verifyToken } from '../middleware/auth.js';
const router = Router();

router.get('/', verifyToken, PlantsController.getAll);
router.post('/', verifyToken, PlantsController.create);
router.get('/:id', verifyToken, PlantsController.getById);
router.delete('/:id', verifyToken, PlantsController.deletePlant);
router.patch('/:id', verifyToken, PlantsController.updatePlant);
router.post('/:id/image', verifyToken, PlantsController.updatePlantImage);

export default router;

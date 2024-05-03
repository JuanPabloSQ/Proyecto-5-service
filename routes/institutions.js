import { Router } from 'express';
import InstitutionsController from '../controller/institutions.js';
import { verifyToken } from '../middleware/auth.js';
const router = Router();

router.get('/', verifyToken, InstitutionsController.getAll);
router.get(
  '/:id/clients',
  verifyToken,
  InstitutionsController.getClientsByInstitution,
);
router.get('/:id', verifyToken, InstitutionsController.getById);

export default router;

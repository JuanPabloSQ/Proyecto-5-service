import { Router } from 'express';
import ClientsController from '../controller/clients.js';
import { verifyToken } from '../middleware/auth.js';

const router = Router();

router.get('/', verifyToken, ClientsController.getAll);
router.post('/', verifyToken, ClientsController.create);
router.delete('/:id', verifyToken, ClientsController.deleteClient);
router.patch('/:id', verifyToken, ClientsController.updateClient);
router.post('/:id/image',verifyToken, ClientsController.updateClientImage);

export default router;

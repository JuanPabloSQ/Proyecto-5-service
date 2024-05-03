import { Router } from 'express';
import UsersController from '../controller/users.js';
import { verifyToken } from '../middleware/auth.js';

const router = Router();

router.get('/', verifyToken, UsersController.getAll);
router.get('/:id', verifyToken, UsersController.getById);
router.post('/', verifyToken, UsersController.create);

export default router;

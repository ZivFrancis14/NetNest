import express from 'express';
const router = express.Router();
import userController from '../controllers/user_controller.js';

router.post('/', (req, res) => userController.create(req, res));
router.get('/', (req, res) => userController.getAll(req, res));
router.get('/:id', (req, res) => userController.getById(req, res));
router.put('/:id', (req, res) => userController.update(req, res));
router.delete('/:id', (req, res) => userController.delete(req, res));



export default router;

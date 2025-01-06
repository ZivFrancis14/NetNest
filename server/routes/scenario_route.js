import express from 'express';
import scenarioController from '../controllers/scenario_controller.js';

const router = express.Router();

router.post('/', (req, res) => scenarioController.create(req, res));
router.get('/', (req, res) => scenarioController.getAll(req, res));
router.get('/:id', (req, res) => scenarioController.getById(req, res));
router.put('/:id', (req, res) => scenarioController.update(req, res));
router.delete('/:id', (req, res) => scenarioController.delete(req, res));



export default router;

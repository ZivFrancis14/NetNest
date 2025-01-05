import express from 'express';
import roomController from '../controllers/room_controller.js';

const router = express.Router();


router.post('/', (req, res) => roomController.create(req, res));
router.get('/', (req, res) => roomController.getAll(req, res));
router.get('/:id', (req, res) => roomController.getById(req, res));
router.put('/:id', (req, res) => roomController.update(req, res));
router.delete('/:id', (req, res) => roomController.delete(req, res));

router.post('/:room_id/join/:join_code', (req, res) => roomController.joinRoom(req, res));
router.get('/:room_id/next-scenario/:owner_id', (req, res) => roomController.nextScenario(req, res));





export default router;

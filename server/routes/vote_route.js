import express from 'express';
const router = express.Router();
import voteController from '../controllers/vote_controller.js';


router.post('/', (req, res) => voteController.create(req, res));
router.get('/', (req, res) => voteController.getAll(req, res));
router.get('/:id', (req, res) => voteController.getById(req, res));
router.put('/:id', (req, res) => voteController.update(req, res));
router.delete('/:id', (req, res) => voteController.delete(req, res));

router.post('/:room_id/answers', (req, res) => voteController.submitAnswer(req, res));
router.get('/:room_id/statistics/:scenario_id', (req, res) => voteController.getStatistics(req, res));



export default router;

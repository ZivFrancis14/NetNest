import express from 'express';
const router = express.Router();
import voteController from '../controllers/vote_controller.js';

//TODO: update vote page path
router.post('/rooms/:room_id/answers', (req, res) => voteController.create(req, res));
router.get('/', (req, res) => voteController.getAll(req, res));
router.get('/:id', (req, res) => voteController.getById(req, res));
router.put('/:id', (req, res) => voteController.update(req, res));
router.delete('/:id', (req, res) => voteController.delete(req, res));
router.post("/rooms/:room_id/answers", voteController.submitAnswer);

export default router;





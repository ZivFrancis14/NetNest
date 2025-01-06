import BaseController from '../controllers/base_controller';
import Vote, { create, find } from '../models/vote_model';

class VoteController extends BaseController {
    constructor() {
        super(Vote); 
    }
    async submitAnswer(req, res) {
        const { room_id } = req.params;
        const { scenario_id, answer, comment, user_id } = req.body;
    
        try {
            const vote = await create({ roomId: room_id, scenarioId: scenario_id, answer, comment, userId: user_id });
            res.status(201).json({ status: true, vote });
        } catch (error) {
            res.status(500).json({ message: 'Error submitting answer', error });
        }
    }

    async getStatistics(req, res) {
        const { room_id, scenario_id } = req.params;
    
        try {
            const votes = await find({ roomId: room_id, scenarioId: scenario_id });
            const correct = votes.filter(v => v.answer === true).length;
            const incorrect = votes.filter(v => v.answer === false).length;
    
            res.status(200).json({ statistics: { correct, incorrect } });
        } catch (error) {
            res.status(500).json({ message: 'Error fetching statistics', error });
        }
    }
    
    
 
}
export default new VoteController();
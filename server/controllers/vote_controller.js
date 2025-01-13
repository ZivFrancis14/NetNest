import BaseController from './base_controller.js';
import Vote from '../models/vote_model.js';
import RoomModel from '../models/room_model.js';
import ScenarioModel from '../models/scenario_model.js';

class VoteController extends BaseController {
    constructor() {
        super(Vote); 
    }
    
    async submitAnswer(req, res){
        const { room_id } = req.params;
        const { scenario_id, answer, comment, user_id } = req.body;
 
    try {
        if (!scenario_id || answer === undefined || !user_id) {
          return res.status(400).json({ status: false, message: "Missing required fields" });
        }
    
        // check scenario corect
        const scenario = await ScenarioModel.findById(scenario_id);
        if (!scenario) {
          return res.status(404).json({ status: false, message: "Scenario not found" });
        }
    
        // create and save new vote
        const newVote = new Vote({
          room_id,
          scenario_id,
          user_id,
          answer,
          comment: comment || null,
        });
    
        await newVote.save();
    
      
    
        res.status(201).json({ status: true, message: "Answer submitted successfully" });
      } catch (error) {
        console.error("Error submitting answer:", error);
        res.status(500).json({ status: false, message: "Internal server error" });
      }
    };

    async getStatistics(req, res) {
      const { room_id, scenario_id } = req.params;
  
      try {
        
          const room = await RoomModel.findOne({ roomId: room_id });
          if (!room) {
              return res.status(404).json({ status: false, message: 'Room not found' });
          }
  
      
          const votes = await Vote.find({ roomId: room_id, scenarioId: scenario_id });
  
          const correct = votes.filter(vote => vote.answer === true).length;
          const incorrect = votes.filter(vote => vote.answer === false).length;
  
          return res.status(200).json({
              status: true,
              statistics: {
                  correct,
                  incorrect,
              },
          });
      } catch (error) {
          console.error('Error fetching statistics:', error);
          return res.status(500).json({ status: false, message: 'Internal server error' });
      }
  }
  
    
}
export default new VoteController();
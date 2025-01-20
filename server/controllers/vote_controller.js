import BaseController from './base_controller.js';
import Vote from '../models/vote_model.js';
import RoomModel from '../models/room_model.js';
import ScenarioModel from '../models/scenario_model.js';

class VoteController extends BaseController {
    constructor() {
        super(Vote); 
    }
    
    async submitAnswer(req, res) {
      try {
        // Extract room_id from params and data from body
        const { room_id } = req.params;
        const { scenarioId, answer, voteId } = req.body;
    
        console.log("DEBUG: room_id:", room_id);
        console.log("DEBUG: scenarioId:", scenarioId);
        console.log("DEBUG: answer:", answer);
    
        // Validate required fields
        if (!scenarioId || answer === undefined || !room_id) {
          console.error("DEBUG: Missing required fields");
          return res.status(400).json({ status: false, message: "Missing required fields" });
        }
    
        // Check if scenario exists
        console.log("DEBUG: Validating scenario...");
        const scenario = await ScenarioModel.findOne({ scenarioId });
        if (!scenario) {
          console.error("DEBUG: Scenario not found");
          return res.status(404).json({ status: false, message: "Scenario not found" });
        }
    
        // Create and save the vote
        console.log("DEBUG: Creating new vote...");
        const newVote = new Vote({
          voteId: voteId || Date.now(),
          scenarioId,
          roomId: room_id,
          answer,
        });
    
        await newVote.save();
    
        console.log("DEBUG: Vote saved successfully:", newVote);
        return res.status(201).json({ status: true, message: "Answer submitted successfully" });
      } catch (error) {
        console.error("DEBUG: Error submitting answer:", error);
        return res.status(500).json({ status: false, message: "Internal server error" });
      }
    }
    
    

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
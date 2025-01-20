import BaseController from './base_controller.js';
import Vote from '../models/vote_model.js';
import RoomModel from '../models/room_model.js';
import ScenarioModel from '../models/scenario_model.js';

class VoteController extends BaseController {
    constructor() {
        super(Vote); 
    }
    
    async submitAnswer(req, res){
      console.log("Params:", req.params); // הדפסת הפרמטרים של ה-URL
      console.log("Body:", req.body); // הדפסת גוף הבקשה
      const { room_id } = req.params;
      const { scenarioId, answer, voteId} = req.body;
 
    try {
        if (!scenarioId || answer === undefined || !room_id) {
          console.error("Missing required fields");
          return res.status(400).json({ status: false, message: "Missing required fields" });
        }
    
        // check scenario corect
        console.log("Validating scenario...");
        const scenario = await ScenarioModel.findById(scenarioId);
        if (!scenario) {
          console.error("Scenario not found");
          return res.status(404).json({ status: false, message: "Scenario not found" });
        }
    
        // create and save new vote
        console.log("Creating new vote...");
        const newVote = new Vote({
          voteId,
          scenarioId,
          roomId: room_id,
          answer,
        });
    
        await newVote.save();
    
        console.log("Vote saved successfully:", newVote);
    
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
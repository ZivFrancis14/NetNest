import BaseController from './base_controller.js';
import Vote from '../models/vote_model.js';
import Scenario from "../models/scenario_model";

class VoteController extends BaseController {
    constructor() {
        super(Vote); 
    }
    
    async create(req, res){
        const { room_id } = req.params;
        const { scenario_id, answer, comment, user_id } = req.body;
 
    try {
        if (!scenario_id || answer === undefined || !user_id) {
          return res.status(400).json({ status: false, message: "Missing required fields" });
        }
    
        // check scenario corect
        const scenario = await Scenario.findById(scenario_id);
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
    
        // TODO: עדכון סטטיסטיקות (כאן אפשר להוסיף לוגיקה לחישוב סטטוס הצבעות)
    
        res.status(201).json({ status: true, message: "Answer submitted successfully" });
      } catch (error) {
        console.error("Error submitting answer:", error);
        res.status(500).json({ status: false, message: "Internal server error" });
      }
    };
    
}
export default new VoteController();
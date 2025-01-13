import BaseController from './base_controller.js';
import ScenarioModel from '../models/scenario_model.js';

class ScenarioController extends BaseController {
    constructor() {
        super(ScenarioModel); 
    }

    async updateVoteStatistics(scenario_id, answer){
        try {
            const scenario = await Scenario.findById(scenario_id);
        
            if (!scenario) {
              console.error("Scenario not found:", scenario_id);
              return false;
            }
        
            // update number of votes
            if (answer) {
              scenario.votes_yes += 1;
            } else {
              scenario.votes_no += 1;
            }
        
            // save changes
            await scenario.save();
            return true;
          } catch (error) {
            console.error("Error updating vote statistics:", error);
            return false;
          }
    };
 
}
export default new ScenarioController();
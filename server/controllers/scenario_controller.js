import BaseController from './base_controller.js';
import ScenarioModel from '../models/scenario_model.js';

class ScenarioController extends BaseController {
    constructor() {
        super(ScenarioModel); 
    }

    async beforeCreate(data) {
          
            const lastScenario = await this.model.findOne().sort({ scenarioId: -1 });

            const nextScenarioId = lastScenario ? lastScenario.scenarioId + 1 : 1;

            data.scenarioId = nextScenarioId;

            return data;

    }
    


 
}
export default new ScenarioController();
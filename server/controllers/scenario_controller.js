import BaseController from './base_controller.js';
import ScenarioModel from '../models/scenario_model.js';

class ScenarioController extends BaseController {
    constructor() {
        super(ScenarioModel); 
    }


 
}
export default new ScenarioController();
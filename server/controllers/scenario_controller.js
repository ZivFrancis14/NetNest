import BaseController from '../controllers/base_controller';
import Scenario from '../models/scenario_model';

class ScenarioController extends BaseController {
    constructor() {
        super(Scenario); 
    }

 
}
export default new ScenarioController();
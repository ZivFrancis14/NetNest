const BaseController = require('../controllers/base_controller');
const Scenario = require('../models/scenario_model');

class ScenarioController extends BaseController {
    constructor() {
        super(Scenario); 
    }

 
}
module.exports = new ScenarioController();
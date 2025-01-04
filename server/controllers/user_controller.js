const BaseController = require('../controllers/base_controller');
const User = require('../models/user_model');

class UserController extends BaseController {
    constructor() {
        super(User); 
    }

 
}
module.exports = new UserController();
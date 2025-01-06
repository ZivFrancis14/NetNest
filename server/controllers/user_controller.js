import BaseController from '../controllers/base_controller';
import User from '../models/user_model';

class UserController extends BaseController {
    constructor() {
        super(User); 
    }

 
}
export default new UserController();
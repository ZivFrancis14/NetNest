import BaseController from './base_controller.js';
import UserModel from '../models/user_model.js';

class UserController extends BaseController {
    constructor() {
        super(UserModel); 
    }

 
}
export default new UserController();
import BaseController from './base_controller.js';
import Vote from '../models/vote_model.js';

class VoteController extends BaseController {
    constructor() {
        super(Vote); 
    }

 
}
export default new VoteController();
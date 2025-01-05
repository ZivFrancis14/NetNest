import BaseController from './base_controller.js';
import RoomModel from '../models/room_model.js';
import Scenario from '../models/scenario_model.js';
import { v4 as uuidv4 } from 'uuid';

class RoomController extends BaseController {
    constructor() {
        super(RoomModel);
    }

    async createRoom(req, res) {
            const { name } = req.body;
        
            if (!name) {
                return res.status(400).json({ message: 'Room name is required' });
            }
        
            try {
                // Fetch the first scenario from the database
                const firstScenario = await Scenario.findOne().sort({ scenarioId: 1 });
        
                if (!firstScenario) {
                    return res.status(400).json({ message: 'No scenarios available in the database' });
                }
        
                // Create the new room with the first scenario as the current scenario
                const room = await RoomModel.create({
                    roomId: uuidv4(),
                    name,
                    ownerId: uuidv4(),
                    joinCode: uuidv4(),
                    currentScenarioId: firstScenario.scenarioId,
                    status: 'New',
                    createdDate: new Date(),
                });
        
                res.status(201).json({
                    room_id: room.roomId,
                    join_code: room.joinCode,
                    owner_id: room.ownerId,
                    current_scenario_id: room.currentScenarioId,
                });
            } catch (error) {
                res.status(500).json({ message: 'Error creating room', error });
            }
        };

    // Join a room using room_id and join_code
    async joinRoom(req, res) {
        const { room_id, join_code } = req.params;
        try {
            const room = await this.model.findOne({ roomId: room_id, joinCode: join_code });
            if (!room) {
                return res.status(404).json({ status: false, ErrorMessage: 'Invalid room ID or join code' });
            }

            const userId =  uuidv4(); //create a new user id
            res.status(200).json({ status: true, user_id: userId });
        } catch (error) {
            res.status(500).json({ message: 'Error joining room', error });
        }
    }

    // Fetch next scenario for a room
    async nextScenario(req, res) {
        const { room_id, owner_id } = req.params;
        try {
            const room = await this.model.findOne({ roomId: room_id, ownerId: owner_id });
            if (!room) {
                return res.status(403).json({ message: 'Unauthorized or invalid room' });
            }

            const scenario = await Scenario.findOne({ roomId: room_id }).sort({ scenarioId: 1 });
            if (!scenario) {
                return res.status(404).json({ message: 'No scenarios available' });
            }

            res.status(200).json({ scenario_id: scenario.scenarioId, text: scenario.text });
        } catch (error) {
            res.status(500).json({ message: 'Error fetching next scenario', error });
        }
    }
}

export default new RoomController();

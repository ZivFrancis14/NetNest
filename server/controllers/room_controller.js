import BaseController from './base_controller.js';
import RoomModel from '../models/room_model.js';
import Scenario from '../models/scenario_model.js';
import VoteModel from '../models/vote_model.js';
import { v4 as uuidv4 } from 'uuid';
import mongoose from 'mongoose';

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
              
                const firstScenario = await Scenario.findOne().sort({ _id: 1 }); 
        
                if (!firstScenario) {
                    return res.status(400).json({ message: 'No scenarios available in the database' });
                }
        
             
                const room = await RoomModel.create({
                    roomId: uuidv4(),
                    name,
                    ownerId: uuidv4(), 
                    joinCode: uuidv4(),
                    currentScenarioId: firstScenario._id,
                    status: 'New',
                    createdDate: new Date(),
                });
        
                res.status(201).json({
                    room_id: room.roomId,
                    join_code: room.joinCode,
                    owner_id: room.ownerId,
                    // current_scenario_id: room.currentScenarioId,
                });
            } catch (error) {
                res.status(500).json({ message: 'Error creating room', error });
            }
        }


    async joinRoom(req, res) {
        const { joinCode } = req.params;

        try {
          // Find the room using the joinCode
          const room = await RoomModel.findOne({ joinCode });
          if (!room) {
            return res.status(404).json({ status: false, message: 'Invalid join code.' });
          }
      
          // Success: Return room details or confirmation
          return res.status(200).json({ status: true, message: 'Successfully joined the game', roomId: room.roomId });
        } catch (error) {
          console.error('Error joining game:', error);
          res.status(500).json({ status: false, message: 'Internal server error.' });
        }
    }

  
    async nextScenario(req, res) {
      
            const { room_id, owner_id } = req.params;
        
            try {
               
                const room = await this.model.findOne({ roomId: room_id, ownerId: owner_id });
                if (!room) {
                    console.error('Room not found or owner mismatch:', { roomId: room_id, ownerId: owner_id });
                    return res.status(403).json({ message: 'Unauthorized or invalid room' });
                }
        
                console.log('Room found:', room);
        
           
                if (!room.currentScenarioId) {
                    return res.status(404).json({ message: 'Current scenario ID is not set in the room' });
                }
        
                
                const currentScenarioId = new mongoose.Types.ObjectId(room.currentScenarioId);
        
                
                const currentScenario = await Scenario.findOne({ _id: currentScenarioId });
                if (!currentScenario) {
                    console.error('Current scenario not found:', { _id: currentScenarioId });
                    return res.status(404).json({ message: 'Current scenario not found in the database' });
                }
        
                console.log('Current scenario:', currentScenario);
        
                
                const nextScenario = await Scenario.findOne({ _id: { $gt: currentScenarioId } }).sort({ _id: 1 });
                if (!nextScenario) {
                    console.warn('No more scenarios available for:', { _id: currentScenarioId });
                    return res.status(404).json({ message: 'No more scenarios available' });
                }
        
                console.log('Next scenario:', nextScenario);
        
            
                room.currentScenarioId = nextScenario._id;
                await room.save();
        
             
                res.status(200).json({ scenario_id: nextScenario._id, text: nextScenario.text });
            } catch (error) {
                console.error('Error fetching next scenario:', error); 
                res.status(500).json({ message: 'Error fetching next scenario', error: error.message || error });
            }
        }

        async submitAnswer(req, res) {
            const { room_id } = req.params;
            const { scenario_id, answer, comment, user_id } = req.body;
    
            try {
          
                const room = await this.model.findOne({roomId: room_id });
                if (!room) {
                    return res.status(404).json({status:false, message: 'Room not found' });
                }
    
              
                const scenario = await Scenario.findOne({ scenarioId: scenario_id });
                if (!scenario) {
                    return res.status(404).json({status:false, message: 'Scenario not found' });
                }
    
             
                await VoteModel.create({
                    voteId: new Date().getTime(), 
                    scenarioId: scenario_id,
                    roomId: room_id,
                    userId: user_id,
                    answer: answer,
                    comment: comment || null,
                    createdDate: new Date(),
                });
    
                return res.status(201).json({ status:true, message: 'Answer submitted successfully' });
            } catch (error) {
                console.error('Error submitting answer:', error);
                res.status(500).json({status:false ,message: 'Error submitting answer', error });
            }
        }
        async getStatistics(req, res) { 
            const { room_id, scenario_id } = req.params;
        
            try {
                const room = await this.model.findOne({ roomId: room_id });
                if (!room) {
                    return res.status(404).json({ message: 'Room not found' });
                }
                const votes = await VoteModel.find({ roomId: room_id, scenarioId: parseInt(scenario_id) });

                const correct = votes.filter(vote => vote.answer === true).length;
                const incorrect = votes.filter(vote => vote.answer === false).length;

                return res.status(200).json({ 
                    statistic:{
                    correct: correct,
                    incorrect: incorrect,
                    }
                });

            }
            catch (error) {
                console.error('Error fetching statistics:', error);
                res.status(500).json({ message: 'Error fetching statistics', error });
        }

        
    }
}
        
    


export default new RoomController();

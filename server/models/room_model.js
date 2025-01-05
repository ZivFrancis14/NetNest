import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const roomSchema = new mongoose.Schema({
    roomId: {
        type: String,
        required: true,
        default: uuidv4, 

    },
    name: { type: String, required: true },
    ownerId: {
        type: String,
        
    },
    joinCode: {
        type: String,
        required: true,
        default: uuidv4,
       
    },
    currentScenarioId: {
        type: String,
        default: null,
    },
    status: {
        type: String,
        enum: ['New', 'Active', 'Close'],
        default: 'New'
    },
    createdDate: {
        type: Date,
        default: Date.now
    }
});

const RoomModel = mongoose.model('Room', roomSchema);
export default RoomModel;

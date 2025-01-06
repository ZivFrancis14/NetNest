import { Schema, model } from 'mongoose';
import { v4 as uuidv4 } from 'uuid'; 

const roomSchema = new Schema({
    roomId: {
        type: String,
        required: true,
        default: uuidv4, 

    },
    name: { type: String, required: true },
    ownerId: {
        type: String,
        required: true,
        
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

const roomModel = model('Room', roomSchema);
export default roomModel;

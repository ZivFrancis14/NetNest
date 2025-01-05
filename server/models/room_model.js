const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid'); 

const roomSchema = new mongoose.Schema({
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

const roomModel = mongoose.model('Room', roomSchema);
module.exports = roomModel;

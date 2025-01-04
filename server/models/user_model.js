const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const userSchema = new mongoose.Schema({
    userId: { 
        type: String,
        required: true,
        default: uuidv4,
        
    },
    roomId: { 
        type: String, 
        required: true,
        default: uuidv4,
       
    }
});

const userModel = mongoose.model('User', userSchema);
module.exports = userModel;

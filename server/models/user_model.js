import { Schema, model } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const userSchema = new Schema({
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

const userModel = model('User', userSchema);
export default userModel;

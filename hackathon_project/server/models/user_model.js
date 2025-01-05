import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

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

const UserModel = mongoose.model('User', userSchema);
export default UserModel;

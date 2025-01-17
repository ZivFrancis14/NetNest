import mongoose from 'mongoose';
const voteSchema = new mongoose.Schema({
    voteId: { 
        type: Number,
        required: true 
    },
    scenarioId: { 
        type: Number,
        ref: 'Scenario', 
        required: true 
    },
    roomId: {
        type: String, 
        ref: 'Room', 
        required: true 
    },
    answer: { 
        type: Boolean,
        required: true 
    },
    createdDate: { 
        type: Date, 
        default: Date.now 
    }
});

const VoteModel = mongoose.model('Vote', voteSchema);
export default VoteModel;
import mongoose from 'mongoose';
import { type } from 'server/reply';
const scenarioSchema = new mongoose.Schema({
    scenarioId: { 
        type: Number,
        required: true 
    },
    text: { 
        type: String, 
        required: true 
    },
    votes_yes: {
        type: Number,
        default: 0
    },
    votes_no: {
        type: Number,
        default: 0
    }
});

const ScenarioModel = mongoose.model('Scenario', scenarioSchema);
export default ScenarioModel;


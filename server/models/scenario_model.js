import mongoose from 'mongoose';
const scenarioSchema = new mongoose.Schema({
    scenarioId: { 
        type: Number,
        required: true 
    },
    text: { 
        type: String, 
        required: true 
    }
});

const ScenarioModel = mongoose.model('Scenario', scenarioSchema);
export default ScenarioModel;


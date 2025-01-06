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

const scenarioModel = mongoose.model('Scenario', scenarioSchema);
module.exports = scenarioModel;

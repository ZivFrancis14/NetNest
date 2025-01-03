const mongoose = require('mongoose');
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

const senerioModel = mongoose.model('Scenario', scenarioSchema);
module.exports = senerioModel;

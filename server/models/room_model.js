const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid'); 

const roomSchema = new mongoose.Schema({
    roomId: {
        type: String,
        required: true,
        default: uuidv4, 
        validate: {
            validator: function (v) {
                return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(v);
            },
            message: props => `${props.value} is not a valid GUID!`
        }
    },
    name: { type: String, required: true },
    ownerId: {
        type: String,
        required: true,
        validate: {
            validator: function (v) {
                return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(v);
            },
            message: props => `${props.value} is not a valid GUID!`
        }
    },
    joinCode: {
        type: String,
        required: true,
        default: uuidv4,
        validate: {
            validator: function (v) {
                return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(v);
            },
            message: props => `${props.value} is not a valid GUID!`
        }
    },
    currentScenarioId: {
        type: String,
        default: null,
        validate: {
            validator: function (v) {
                // Allow null or a valid GUID
                return v === null || /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(v);
            },
            message: props => `${props.value} is not a valid GUID!`
        }
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

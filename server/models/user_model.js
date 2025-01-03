const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const userSchema = new mongoose.Schema({
    userId: { 
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
    }
});

const userModel = mongoose.model('User', userSchema);
module.exports = userModel;

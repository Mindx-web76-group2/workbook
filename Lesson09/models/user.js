const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    uname: {
     type: String,
     required: true   
    },
    fname:  {
        type: String,
        required: true   
    },
    gender: {
        type: Boolean,
        default: 0
    },
    role: {
        type: String,
        default: 'admin'
    },
    pwd: {
        type: String,
        required: true
    },
    isActive: {
        type: Boolean,
        default: false
    }
});

const User = mongoose.model('users', userSchema)

module.exports = User;
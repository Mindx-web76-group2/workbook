// getting-started.js
const mongoose = require('mongoose');
const User = require('../models/user')
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log('Connecting to db ...')

    } catch (error) {
        console.log(error)
    } 
}

module.exports = {
    connectDB
}
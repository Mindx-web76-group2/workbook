// getting-started.js
const mongoose = require('mongoose');

const uri = `mongodb+srv://vivt_mindx_web76:${process.env.MONGODB_PWD}@web76cluster.ttoub03.mongodb.net/${process.env.MONGODB_DB_NAME}?retryWrites=true&w=majority&appName=web76cluster`;
const connectDB = async () => {
    try {
        await mongoose.connect(uri);
        console.log('Connected to database successfully');
    } catch (error) {
        console.log(error.message)
    }
}


module.exports = {
    connectDB
}


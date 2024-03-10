import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
const app = express();
const PORT = process.env.PORT || 4001;
const uri = `mongodb+srv://vivt_mindx_web76:${process.env.MONGODB_PWD}@web76cluster.ttoub03.mongodb.net/${process.env.MONGODB_DB_NAME}?retryWrites=true&w=majority&appName=web76cluster`;

app.use(express.json());

try {
    await mongoose.connect(uri);
    console.log('Connected to database successfully');
} catch (error) {
    
}

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})

import 'dotenv/config';
import express from 'express';
import {connectDB} from './configs/db.cfg.js';
import router from './routes/index.js';
await connectDB();

const PORT = process.env.PORT || 4001;

const app = express();

app.use(express.json());

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true
    }
})

const User = mongoose.model('User', userSchema);
// Viết API việc đăng ký user với userName, id sẽ được là một string ngẫu nhiên, không được phép trùng, bắt đầu từ ký tự US (ví dụ: US8823).
app.post('/users', userRouter)
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})

import express from 'express';
import { v4 as uuidv4 } from 'uuid';

import { users, posts } from './mock.js';


const app = express()
app.use(express.json())
app.post('/users', (req, res) => {
    const {email, age, userName} = req.body || {};
    const existedUser = users.find(u => u.email === email);
    if (existedUser) {
        res.status(500).json({
            msg: 'User is existed!'
        })
    } else {
        if (age > 0) {
            const id =  uuidv4();
            users.push({
                id,
                email,
                age, 
                userName
            })
            res.status(201).json({
                msg: 'Add successfully!',
                data: id
            })
        } else {
            res.status(500).json({
                msg: 'Age is invalid!'
            })
        }
    }
} )


app.post('/posts/:userId', (req, res) => {
    const {content, isPublic} = req.body || {};
    const {userId} = req.params || {}

    const existedUser = users.find(u => u.id === userId);
    posts.filter(p => p.isPublic)
    if (!existedUser) {
        res.status(404).json({
            msg: 'User is not found!'
        })
    } else {
        const id = uuidv4();
        posts.push({
            content,
            isPublic: Boolean(isPublic),
            createdAt: new Date(),
            postId: id,
            userId
        })
        res.status(201).json({
            msg: 'Add successfully!',
            id,
            data: posts
        })
    }})
const PORT = 3000;
app.listen(PORT, () => console.log('Listening on port ', PORT))
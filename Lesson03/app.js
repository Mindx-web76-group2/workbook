import express from 'express';
import axios from 'axios'
const app = express();
app.use(express.json());

// Viết API việc đăng ký user với userName, id sẽ được là một string ngẫu nhiên, không được phép trùng, bắt đầu từ ký tự US (ví dụ: US8823).
app.post('/users', async (req, res) => {
    let status = 500;
    try {
        const { userName} = req.body || {};
        // Check if user name is required.
        if (!userName) {
            status = 400;
            throw new Error('User name is required!');
        }
        // check if user name is existed.
        const existedUser = await axios.get(`http://localhost:3000/users?userName=${userName}`);
        if (existedUser && existedUser.data.length > 0) {
            status = 500;
            throw new Error('User name is existed!');
        } 
        // create new user.
        const newUser = await axios.post(`http://localhost:3000/users`, {
            id: 'US' + Math.floor(Math.random() * 10000) + 1,
            userName
        })
        return res.status(201).json({
            data: newUser.data,
            msg: 'Add successfully!'
        });
    } catch (error) {
        return res.status(status).json({
            msg: error.message
        })
    }
})
// Viết API cho phép user tạo bài post (thêm bài post, xử lý id tương tự user).
app.post('/posts', async (req, res) => {
    let status = 500;
    try {
        const {content, userId} = req.body || {};
        // check if content and userId is required.
        if (!content ||!userId) {
            status = 400;
            throw new Error('Content and userId is required!');
        }
        const existedUser = await axios.get(`http://localhost:3000/users/${userId}`);
        if (!existedUser) {
            status = 404;
            throw new Error('User is not found!');
        } 
        // create new post.
        const newPost = await axios.post(`http://localhost:3000/posts`, {
            id: 'PS' + Math.floor(Math.random() * 10000) + 1,
            content,
            userId
        })
        return res.status(201).json({
            data: newPost.data,
            msg: 'Add successfully!'
        });
    } catch (error) {
        return res.status(status).json({
            msg: error.message
        })
    }
})

// Viết API cho phép user chỉnh sửa lại bài post (chỉ user tạo bài viết mới được phép chỉnh sửa).
app.put('/posts/:postId', async (req, res) => {
    let status = 500;
    try {
        const {content, userId} = req.body || {};
        const {postId} = req.params || {};
        // check if content, userId and postId is required.
        if (!content ||!postId ||!userId) {
            status = 400;
            throw new Error('Content, userId and postId is required!');
        }
        // check if user is existed.
        const existedUser = await axios.get(`http://localhost:3000/users/${userId}`);
        if (!existedUser) {
            status = 404;
            throw new Error('User is not found!');
        }
        // check if post is existed and user is the owner
        const existedPost = await axios.get(`http://localhost:3000/posts/${postId}?userId=${userId}`);
        if (!existedPost) {
            status = 404;
            throw new Error('Post is not found!');
        } 
        // update post.
        const updatedPost = await axios.put(`http://localhost:3000/posts/${postId}`, {
            content
        })
        return res.status(200).json({
            data: updatedPost.data,
            msg: 'Update successfully!'
        });
        
    } catch (error) {
        return res.status(status).json({
            msg: error.message
        })
    }
})
// Viết API cho phép user được comment vào bài post
app.post('/comments', async (req, res) => {
    let status = 500;
    try {
        const {content, userId, postId} = req.body || {};
        // check if content, userId and postId is required.
        if (!content ||!postId ||!userId) {
            status = 400;
            throw new Error('Content, userId and postId is required!');
        }
        // check if user is existed.
        const existedUser = await axios.get(`http://localhost:3000/users/${userId}`);
        if (!existedUser) {
            status = 404;
            throw new Error('User is not found!');
        }
        // check if post is existed 
        const existedPost = await axios.get(`http://localhost:3000/posts/${postId}`);
        if (!existedPost) {
            status = 404;
            throw new Error('Post is not found!');
        }
        // create new comment.
        const newComment = await axios.post(`http://localhost:3000/comments`, {
            id: 'CM' + Math.floor(Math.random() * 10000) + 1,
            content,
            userId,
            postId
        })
        return res.status(201).json({
            data: newComment.data,
            msg: 'Add successfully!'
        });
    } catch (error) {
        return res.status(status).json({
            msg: error.message
        })
    }
})
// Viết API cho phép user chỉnh sửa comment (chỉ user tạo comment mới được sửa)
app.put('/comments/:commentId', async (req, res) => {
    let status = 500;
    try {
        const {userId, content} = req.body || {};
        const {commentId} = req.params || {};
        // check if userId, content and commentId is required.
        if (!userId ||!commentId ||!content) {
            status = 400;
            throw new Error('UserId, content and commentId is required!');
        }
        // check if user is existed.
        const existedUser = await axios.get(`http://localhost:3000/users/${userId}`);
        if (!existedUser) {
            status = 404;
            throw new Error('User is not found!');
        }
        // check if comment is existed and user is the owner
        const existedComment = await axios.get(`http://localhost:3000/comments/${commentId}?userId=${userId}`);
        if (!existedComment) {
            status = 404;
            throw new Error('Comment is not found!');
        }
        // update comment.
        const updatedComment = await axios.put(`http://localhost:3000/comments/${commentId}`, {
            content
        })
        return res.status(200).json({
            data: updatedComment.data,
            msg: 'Update successfully!'
        })
    } catch (error) {
        return res.status(status).json({
            msg: error.message
        })
    }
})
// Viết API lấy tất cả comment của một bài post.
app.get('/posts/:postId/comments', async (req, res) => {
    let status = 500;
    try {
        const {postId} = req.params || {};
        // check if postId is required.
        if (!postId) {
            status = 400;
            throw new Error('PostId is required!');
        }
        // check if post is existed.
        const existedPost = await axios.get(`http://localhost:3000/posts/${postId}`);
        if (!existedPost) {
            status = 404;
            throw new Error('Post is not found!');
        }
        // get comments of post.
        const comments = await axios.get(`http://localhost:3000/posts/${postId}/comments`);
        return res.status(200).json({
            data: comments.data,
            msg: 'Get successfully!'
        })
    } catch (error) {
        return res.status(status).json({
            msg: error.message
        })
    }
})
// Viết API lấy tất cả các bài post, 3 comment đầu (dựa theo index) của tất cả user .
app.get('/posts/comments', async (req, res) => {
    let status = 500;
    try {
        // get all posts.
        const posts = await axios.get(`http://localhost:3000/posts?_embed=comments`);
        return res.status(200).json({
            data: posts.data,
            msg: 'Get successfully!'
        })
    } catch (error) {
        return res.status(status).json({
            msg: error.message
        })
    }
})
// Viết API lấy một bài post và tất cả comment của bài post đó thông qua postId
app.get('/posts/:postId/comments', async (req, res) => {
    let status = 500;
    try {
        const {postId} = req.params || {};
        // check if postId is required.
        if (!postId) {
            status = 400;
            throw new Error('PostId is required!');
        }
        // get post by id with comments.
        const post = await axios.get(`http://localhost:3000/posts/${postId}?_embed=comments`);
        return res.status(200).json({
            data: post.data,
            msg: 'Get successfully!'
        })
    } catch (error) {
        return res.status(status).json({
            msg: error.message
        })
    }
})
app.listen(8080, () => {
    console.log('Server is running!');
});
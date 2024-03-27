import express from "express";
const router = express.Router();

router.post("/users", async (req, res) => {
        let status = 500;
        try {
            const { userName} = req.body || {};
            // Check if user name is required.
            if (!userName) {
                status = 400;
                throw new Error('User name is required!');
            }
            // const findUser = users.find(u.userName === userName);
            // check if user name is existed.
            const existedUser = await axios.get(`http://localhost:3000/users?userName=${userName}`);
            if (existedUser && existedUser.data.length > 0) {
                status = 500;
                throw new Error('User name is existed!');
            } 
            // create new user.
            // users.push()
            // const newUser = await axios.post(`http://localhost:3000/users`, {
            //     id: 'US' + Math.floor(Math.random() * 10000) + 1,
            //     userName
            // })
    
            const newUser = await User.create({
                userName
            })
            return res.status(201).json({
                data: newUser,
                msg: 'Add successfully!'
            });
        } catch (error) {
            return res.status(status).json({
                msg: error.message
            })
        }
    }
)
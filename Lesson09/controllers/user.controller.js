const {findUsersBy, insertUser} = require('../services/user.service');
const getAllUsers = (req, res) => {
    const result = findUsersBy();
    return res.json({
        msg: 'success',
        data: result
    });
}

const getUsersBy = (req, res) => {
    const {body} = req;
    let result = null;
    if (body) {
        const {filters} = body;
        if (filters) {
            result = findUsersBy({filters});
        }
    }
    return res.json({
        msg: 'success',
        data: result
    });
}

const updateUserById = (req, res) => {

}
// uuid
const deleteUserById = (req, res) => {


}

const createAnUser = (req, res) => {
    const {body, decode} = req;
    if (decode && decode.role === 'admin') {
        let result;
        if (body) {
            const {uname, fname, gender} = body;
            if (!uname || !fname || gender === null) {
                return res.status(400).json({
                    msg: 'fail, not enough info...'
                })
            }
            result = insertUser({uname, fname, gender});
            if (!result) {
                return res.status(400).json({
                    msg: 'fail, user existed!'
                })
            } 
        }
        return res.json({
            msg: 'insert successfully!'
        })
    } else if (decode && decode.role === 'guest') {
        return res.status(403).json({
            msg: 'Not permission'
        })
    } else {
        return res.status(404).json({
            msg: 'Role is invalid'
        })
    }
   
}


const createUsers = (req, res) => {
    const {body} = req;
    let result = {
        success: [],
        fail: []
    }
    if (body) {
        const {users=[]} = body;
        users.map(user => {
            const {uname, fname, gender} = user;
            if (!uname || !fname || gender === null) {
                result.fail.push(user)
                return
            }
            let _result = insertUser({uname, fname, gender});
            if (!_result) {
                result.fail.push(user)
                return
            } 
            result.success.push(user)
        })
    }
    return res.json({
        data: result
    })
}
module.exports = {
    getAllUsers, 
    getUsersBy,
    createAnUser, 
    createUsers,
    updateUserById,
    deleteUserById
}
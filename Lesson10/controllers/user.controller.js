const {findUsersBy, insertUser, countUsers, updateUserBy} = require('../services/user.service');
const cloudinaryUploadImage = require("../helpers/cloudinaryUploadImage");
const getAllUsers = async (req, res) => {
    const {query} = req;
    const page = query.page || 1;
    const limit = query.limit || 10;
    const skip = (page - 1) * limit;

    const result = await findUsersBy({filters: {}, pagination: {limit, skip}});

    const total = await countUsers();

    return res.json({
        msg: 'success',
        data: result,
        pagination: {
            page,
            limit,
            totalItems: total,
            totalPage: Math.ceil(total / limit)
        }
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

const uploadAvatar = async (req, res) => {
    const {decode, file} = req;
    try {
        const resp = await cloudinaryUploadImage(
            file.path
        );
        console.log(resp)
        const {secure_url, width, height} = resp;
        // avatar: server/uploads/tenfile.png
        await updateUserBy({avatar: secure_url}, {uname: decode.uname});
        return res.status(200).json({
            msg: "Upload Success",
            imageUrl: secure_url,
            imageInfo: {
                height,
                width,
            },
        });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ msg: "Upload Failed" });
    }
  
};
module.exports = {
    getAllUsers, 
    getUsersBy,
    createAnUser, 
    createUsers,
    updateUserById,
    deleteUserById,
    uploadAvatar
}
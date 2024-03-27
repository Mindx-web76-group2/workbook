const User = require('./../models/user')

const findUsersBy = async (params={}) => {
    try {
        const {filters, pagination={skip: 0, limit: 10}} = params;
        let findUsers = [];
        if (filters && pagination) {
            findUsers = await User.find(filters).skip(pagination.skip).limit(pagination.limit);
        }

        return findUsers;
    } catch (error) {
        console.log(error);
        throw error;
    }
} 


const countUsers = async () => {
    try {
        const total = await User.countDocuments();
        return total;
    } catch (error) {
        console.log(error);
        throw error;
    }
}
const insertUser = async (params={}) => {
    try {
        const {uname, fname, gender, pwd} = params;
        const newUser = await User({
            uname, fname, gender, pwd,
            isActive: false,
            role: 'guest'
        });
        await newUser.save()
    } catch (error) {
        console.log(error);
        throw error;
    }
}
/**
 * Cập nhật thông tin user bởi filter
 * \
 * @param {Object} params 
 * @param {Object} filters
 */
const updateUserBy = async (params, filters) => {
    try {
      await User.updateOne(filters, params); // db đã được update nhưng trong code đang chạy thì chưa cập nhật
    } catch (error) {
        console.log(error);
        throw error;
    }
}

const deleteUserBy = (params, id) => {

}


module.exports = {
    insertUser,
    findUsersBy,
    updateUserBy,
    deleteUserBy,
    countUsers
}
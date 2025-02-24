const connection = require('../config/database');
const {getAllUsers, createUserService, getUserId, updateUser,deleteUser} = require('../services/CRUDServices');

const handleAllUsers = async (req,res) =>{
    let results = await getAllUsers();
    return res.status(200).json({
        message : 'ok',
        data: results
    })
}

const handleDeleteUser = async (req,res) => {
    const userId = req.params.id;
    const results = await deleteUser(userId);
    if(!userId){
        return res.status(400).json({
            message: 'Missing user ID'
        })
    }
    return res.status(200).json({
        message: 'user delete',
        data: results
    })
}
const handleUpdateUser  = async (req,res) =>{
    const userId = req.params.id;
    const {username, password, email} = req.body;
    if(!userId || !username || !password || !email){
        return res.status(400).json({
            message: 'Missing paramter'
        })
    }
    const results = await updateUser(userId,username,password,email);
    
    return res.status(200).json({
        message: 'User update success',
        data: results
    })
}

const createUser = async (req,res) =>{
    const {username, password, email } = req.body; // Lấy dữ liệu từ form
    if(!username || !password || !email){
        return res.status(400).json({
            message: 'Missing information User'
        })
    }
    const result = await createUserService(username,password,email);
    return res.status(201).json({
        message: 'Create users',
        data: result
    })
    
}

module.exports = {
    handleAllUsers,
    handleDeleteUser,
    handleUpdateUser,
    createUser
    
}
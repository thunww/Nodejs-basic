const connection = require('../config/database');
const {getAllUsers, createUserService, getUserId, updateUser,deleteUser, getUserEmail} = require('../services/CRUDServices');
const handlePassword = require('../utils/hashPassword');
const bcrypt = require('bcrypt');


const handleAllUsers = async (req, res) => {
    if (!req.session.user) {
        return res.status(401).json({ message: "Not logged in" });
    }

    try {
        let results = await getAllUsers();
        return res.status(200).json({
            message: "ok",
            user: req.session.user,
            data: results
        });
    } catch (error) {
        console.error("Error fetching users:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};


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

const createUser = async (req, res) => {
    
    const { username, password, email } = req.body;

    if (!username || !password || !email) {
        return res.status(400).json({ message: 'Missing information User' });
    }

    try {

        const handlePW = handlePassword(password);
        const result = await createUserService(username, handlePW, email);

        return res.status(201).json({
            message: 'User created successfully',
            data: result
        });
    } catch (err) {
        console.error('Create user error:', err);

        if (err.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({ message: 'Email already exists' });
        }

        return res.status(500).json({ message: 'Internal server error' });
    }
};

const handleLogin = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Missing email or password' });
    }

    try {
        const user = await getUserEmail(email); // Hàm tìm user theo email
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Kiểm tra password có đúng không
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Lưu session
        req.session.user = { id: user.id, email: user.email };

        // Trả về phản hồi
        return res.status(200).json({
            message: 'Login successful',
            user: { id: user.id, username: user.username, email: user.email }
        });

    } catch (err) {
        console.error('Login error:', err);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

const checkAuth = (req, res) => {
    if (req.session.user) {
        return res.status(200).json({ user: req.session.user });
    }
    return res.status(401).json({ message: "Not authenticated" });
};


module.exports = {
    handleAllUsers,
    handleDeleteUser,
    handleUpdateUser,
    createUser,
    handleLogin,
    checkAuth
    
}
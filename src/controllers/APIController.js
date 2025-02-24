const connection = require('../config/database');
const {getAllUsers, createUserService, getUserId, updateUser,deleteUser} = require('../services/CRUDServices');

const handleAllUsers = async (req, res) => {
    try {
      const results = await getAllUsers();
      return res.status(200).json({
        success: true,
        message: 'Fetched all users successfully',
        data: results,
      });
    } catch (error) {
      console.error('Error fetching users:', error);
      return res.status(500).json({
        success: false,
        message: 'Internal server error',
      });
    }
  };
  
  const handleDeleteUser = async (req, res) => {
    try {
      const userId = req.params.id;
      if (!userId) {
        return res.status(400).json({
          success: false,
          message: 'Missing user ID',
        });
      }
  
      const results = await deleteUser(userId);
  
      // Nếu không có user nào bị xoá (affectedRows === 0)
      if (results.affectedRows === 0) {
        return res.status(404).json({
          success: false,
          message: 'User not found',
        });
      }
  
      return res.status(200).json({
        success: true,
        message: 'User deleted successfully',
        data: results,
      });
    } catch (error) {
      console.error('Error deleting user:', error);
      return res.status(500).json({
        success: false,
        message: 'Internal server error',
      });
    }
  };
  
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
        const result = await createUserService(username, password, email);

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

module.exports = {
    handleAllUsers,
    handleDeleteUser,
    handleUpdateUser,
    createUser
    
}
const { User } = require('../models');
const { Sequelize } = require('sequelize');
// Lấy tất cả người dùng
const getAllUsers = async () => {
  try {
    const results = await User.findAll();
    return results;
  } catch (error) {
    console.error('Error fetching all users:', error);
    throw error;
  }
};

// Tạo người dùng mới
const createUserService = async (username, password, email) => {
  try {
    const newUser = await User.create({ username, password, email });
    console.log('Người dùng đã được thêm:', newUser);
    return newUser;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};

// Lấy người dùng theo id
const getUserId = async (id) => {
  try {
    const user = await User.findByPk(id);
    console.log(user);
    return user;
  } catch (error) {
    console.error('Error fetching user by id:', error);
    throw error;
  }
};

const getUserEmail = async (email) => {
  try {
      const user = await User.findOne({
          where: { email },  // Tìm user theo email
      });
      return user; // Trả về user nếu tìm thấy, null nếu không có
  } catch (error) {
      console.error("Lỗi truy vấn user:", error);
      throw error;
  }
};

// Cập nhật thông tin người dùng
const updateUser = async (id, username, password, email) => {
  try {
    const [affectedRows] = await User.update(
      { username, password, email },
      { where: { id } }
    );
    console.log('Người dùng đã được cập nhật:', affectedRows);
    return affectedRows;
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
};

// Xóa người dùng
const deleteUser = async (id) => {
  try {
    const affectedRows = await User.destroy({ where: { id } });
    console.log('Xóa người dùng:', affectedRows);
    return affectedRows;
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
};

module.exports = {
  getAllUsers,
  createUserService,
  getUserId,
  updateUser,
  deleteUser,
  getUserEmail
};

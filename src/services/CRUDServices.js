const connection = require('../config/database')

const getAllUsers =  async () =>{
    let [results, fields] = await connection.query('SELECT * FROM users');
    //console.log(results);
    return results;
}
const createUserService = async (username,password,email) =>{
    let[results,fields] = await connection.query('INSERT INTO users (username, password, email) VALUES (?, ?, ?)',[username,password,email])
    console.log('Người dùng đã được thêm:', results);
    return results;
}

const getUserId = async (id) =>{
    let [results, fields] = await connection.query('SELECT * FROM users where id = ?',[id])
    console.log(results);
    return results[0];
}
const updateUser = async (id, username, password, email) => {
    const [results] = await connection.query(
        'UPDATE users SET username = ?, password = ?, email = ? WHERE id = ?',
        [username, password, email, id]
    );
    console.log('Người dùng đã được cập nhật:', results);
    return results; // Trả về kết quả để biết có cập nhật thành công không
};

const deleteUser = async (id) => {
    const [results] = await connection.query('DELETE FROM users WHERE id = ?', [id]);
    console.log('Xóa người dùng:', results);
    return results; // Trả về kết quả để kiểm tra affectedRows
};


module.exports = {
    getAllUsers,
    createUserService,
    getUserId,
    updateUser,
    deleteUser
}
const mysql = require('mysql2/promise');

const connection = mysql.createPool({
    host: process.env.DB_HOST,      // Địa chỉ máy chủ MySQL
    user: process.env.DB_USER,           // Tên đăng nhập MySQL
    password: process.env.DB_PASSWORD, // Mật khẩu của bạn
    database: process.env.DB_DATABASE , // Tên cơ sở dữ liệu
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0  
  });

  module.exports = connection;
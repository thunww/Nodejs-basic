const { Sequelize } = require('sequelize');

// Thay đổi các thông tin dưới đây theo cấu hình của bạn
const sequelize = new Sequelize('nodejs', 'root', 'root', {
  host: 'localhost',
  dialect: 'mysql', // thay bằng 'postgres', 'sqlite', 'mssql' nếu cần
  logging: false,   // tắt log nếu không muốn hiển thị quá nhiều thông tin
});

module.exports = sequelize;

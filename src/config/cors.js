const cors = require('cors');
require('dotenv').config(); // Đọc biến môi trường từ .env

const configCORS = (app) => {
  const corsOptions = {
    origin: process.env.CLIENT_URL || "http://localhost:3000", // Lấy từ .env, nếu không có thì mặc định localhost:3000
    methods: ["GET", "POST", "PUT", "DELETE"], // Các method được phép
    credentials: true // Cho phép gửi cookie/token
  };

  app.use(cors(corsOptions));
};

module.exports = configCORS;

const express = require("express");
const cors = require("cors");
const authRoutes = require("./routers/authRoutes");
const userRoutes = require("./routers/userRoutes");

const app = express();

// Middleware
app.use(express.json());
app.use(cors()); // Cho phép gọi API từ frontend
// Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", userRoutes);

// Xử lý lỗi 404 (Not Found)
app.use((req, res, next) => {
  res.status(404).json({ message: "Route not found" });
});

// Xử lý lỗi toàn cục
app.use((err, req, res, next) => {
  console.error("Error:", err);
  res.status(500).json({ message: "Internal Server Error" });
});

module.exports = app; // Xuất app để server.js có thể dùng

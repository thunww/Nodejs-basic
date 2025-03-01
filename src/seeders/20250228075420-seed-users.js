"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "users",
      [
        {
          username: "admin",
          email: "admin@example.com",
          password: "$2b$10$abcdefghijklmnopqrstuv", // Mật khẩu đã hash
          role: "admin",
        },
        {
          username: "user1",
          email: "user1@example.com",
          password: "$2b$10$abcdefghijklmnopqrstuv",
          role: "user",
        },
        {
          username: "user2",
          email: "user2@example.com",
          password: "$2b$10$abcdefghijklmnopqrstuv",
          role: "user",
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("users", null, {});
  },
};

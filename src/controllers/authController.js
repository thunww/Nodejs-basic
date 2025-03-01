const { registerUser, loginUser } = require("../services/authService");

const handleRegister = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;
    const user = await registerUser(username, email, password, role);
    return res.status(201).json({ message: "User registered", user });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const handleLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { token, user } = await loginUser(email, password);
    return res.status(200).json({ token, user });
  } catch (error) {
    return res.status(401).json({ message: error.message });
  }
};

module.exports = { handleRegister, handleLogin };

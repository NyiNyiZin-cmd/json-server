const bcrypt = require("bcryptjs");
const axios = require("axios");
const { generateToken } = require("../utils/jwt");

const API = "http://localhost:3003/users";

const register = async (req, res) => {
  // console.log(req.body);
  const { username, email, password } = req.body;
  try {
    // Input validation 
    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required, username, email, password" });
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format, eg : sample@gmail.com" });
    }

    // Password strength check
    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters" });
    }

    const existingUsers = await axios.get(API);
    console.log(existingUsers.data[0]);
    const user = existingUsers.data.find((u) => u.email === email);
    if (user) return res.status(400).json({ message: "User Already Exist" });

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    // create user
    const newUser = {
      username,
      email,
      password: hashedPassword,
    };
    await axios.post(API, newUser);
    res.json({ data: newUser, message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error registering user" });
  }
};

const login = async (req, res) => {
//   console.log(req.body);
  const { email, password } = req.body;
  try {
    const existingUsers = await axios.get(API);
    // console.log(existingUsers.data);
    const user = existingUsers.data.find((u) => u.email === email);
    if (!user) return res.status(400).json({ message: "User not registered" });
    // confirm password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword)
      return res
        .status(400)
        .json({ message: "Email and Password Do not match" });

    const token = generateToken(user);
    res.send({ token });
  } catch (err) {
    res.status(500).json({ message: "Error logging In" });
  } 
};

module.exports = { register, login };

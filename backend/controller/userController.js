const User = require("../models/userSchema");
const { hashPassword, token, comparePassword } = require("../utils/userUtils");

module.exports.signUp = async (req, res) => {
  try {
    const { email, password, name, role } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      return res
        .status(400)
        .send({ message: "Email already exists", success: false });
    }

    const hash = await hashPassword(password);

    const newUser = await User.create({
      name: name,
      email: email,
      password: hash,
      role: role,
    });

    const tokendata = await token({
      id: newUser._id,
      email: newUser.email,
      name: newUser.name,
      role: newUser.role,
    });

    res.status(201).json({
      message: "User created",
      tokendata,
      user: newUser,
      success: true,
    });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports.login = async (req, res) => {
  const { login, password } = req.body;
  const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(login);
  const user = await User.findOne(isEmail ? { email: login } : { name: login });
  if (!user) {
    return res.status(400).json({ message: "User not found", success: false });
  }
  const isMatch = await comparePassword(user.password, password);
  if (!isMatch) {
    return res.status(400).json({ message: "Invalid password" });
  }

  const tokendata = await token({
    name: user.name,
    id: user._id,
    email: user.email,
    role: user.role,
  });

  res.send({ message: "Login successful", tokendata, user, success: true });
};

module.exports.getUserEmail = async (req, res) => {
  try {
    const email = req.params.email;
    const foundUser = await User.findOne({ email });
    if (!foundUser) {
      return res.status(404).send({ message: "User not found" });
    }
    res.send(foundUser);
  } catch (error) {
    console.error("Error getting user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

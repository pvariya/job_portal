const User = require("../models/userSchema");
const { hashPassword, token, comparePassword } = require("../utils/userUtils");

module.exports.signUp = async (req, res) => {
  try {
    const { email, password, name, role } = req.body;

    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).send({ message: "Email already exists", success: false });
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
      username: newUser.username,
      role: newUser.role,
    });

    res.status(201).json({ message: "User created", tokendata, user: newUser });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email });
  if (!user) {
    return res.status(404).send({ message: "User not found" });
  }
  const isMatch = await comparePassword(user.password, password);
  if (!isMatch) {
    return res.status(401).send({ message: "Invalid credentials" });
  }
  const tokendata = await token({
    id: user._id,
    email: user.email,
    username: user.username,

    role: user.role,
  });
  res.send({ message: "Logged in successfully", tokendata, user });
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
}
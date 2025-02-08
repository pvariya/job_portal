const User = require("../models/userSchema");
const { hashPassword, token } = require("../utils/userUtils");

module.exports.signUp = async (req, res) => {
  try {
    const { email, password, name, role } = req.body;

    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "Email already exists" });
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
    });

    res.status(201).json({ message: "User created", tokendata, user: newUser });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

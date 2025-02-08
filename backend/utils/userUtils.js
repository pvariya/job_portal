const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const hashPassword = async (password) => {
  const hash = await bcrypt.hash(password, 10);
  return hash;
};

const comparePassword = async (hash, password) => {
  const hashedPassword = await bcrypt.compare(password, hash);
  return hashedPassword;
};

const token = async (data) => {
  try {
    const token = jwt.sign(data, "privet-key");
    return token;
  } catch (error) {
    throw new Error("Could not sign token: " + error);
  }
};

module.exports = {
  hashPassword,
  comparePassword,
  token,
};

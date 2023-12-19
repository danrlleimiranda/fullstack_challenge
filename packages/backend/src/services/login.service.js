const { User } = require("../models");
const jwt = require("jsonwebtoken");

const secret = process.env.JWT_SECRET;

const isBodyValid = (username, password) => username && password;

const validateLogin = async ({ username, password }) => {
  if (!isBodyValid(username, password))
    return {
      status: 400,
      data: { message: "username and password is required" },
    };

  const user = await User.findOne({
    where: { username },
  });

  if (!user) return { status: 400, data: { message: "User not registered" } };

  if (user.password !== password)
    return { status: 401, data: { message: "user/password is wrong" } };

  const jwtConfig = {
    expiresIn: "7d",
    algorithm: "HS256",
  };
  const token = jwt.sign({ data: { userId: user.id } }, secret, jwtConfig);

  return { status: 200, data: { token } };
};

module.exports = {
  validateLogin,
};

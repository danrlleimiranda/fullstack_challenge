const { User } = require("../models");
const {
  validateNewUser: validateUser,
} = require("../services/validations/validateInputValues");

const validateNewUser = async (req, res, next) => {
  const {
    fullName,
    username,
    email,
    password,
    city,
    street,
    number,
    district,
    admin,
  } = req.body;

  const error = validateUser({
    fullName,
    username,
    email,
    password,
    city,
    street,
    number,
    district,
    admin,
  });


  if (error) return res.status(error.status).json(error.data);

  const user = await User.findOne({
    where: {
      email,
    },
  });

  if (user) return res.status(400).json({ message: "Usuário já cadastrado" });

  next();
};

module.exports = {
  validateNewUser,
};

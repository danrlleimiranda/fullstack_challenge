const { User, Address, District, City, sequelize } = require("../models");
const { validateNewUser } = require("./validations/validateInputValues");

const getById = async (id) => {
  const user = await User.findOne({
    where: { id },
    attributes: { exclude: ["password"] },
    include: {
      model: Address,
      as: "address",
      include: [
        { model: District, as: "district" },
        { model: City, as: "city" },
      ],
    },
  });

  return user;
};

const getAll = async (id) => {
  const users = await User.findAll({
    include: {
      model: Address,
      as: "address",
      attributes: ["address"],
      include: [
        { model: City, as: "city", attributes: ["city"] },
        { model: District, as: "district", attributes: ["district"] },
      ],
    },
    order: [
      sequelize.literal(
        `(CASE WHEN User.id = ${id} THEN 0 ELSE 1 END), User.id DESC`
      ),
    ],
  });

  return users;
};

const createNewUser = async ({
  fullName,
  username,
  email,
  password,
  admin,
  image,
}) => {
  const error = validateNewUser({
    fullName,
    username,
    email,
    password,
  });

  if (error) return { status: error.status, data: error.data };

  const newUser = await User.create({
    fullName,
    username,
    email,
    password,
    admin: admin === "false" ? false : true,
    image,
  });

  return {status: 201, data: newUser}
};
module.exports = {
  getById,
  getAll,
  createNewUser
};

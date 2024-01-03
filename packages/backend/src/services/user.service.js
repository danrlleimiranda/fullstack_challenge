const { User, Address } = require("../models");
const { validateNewUser } = require("./validations/validateInputValues");
const Sequelize = require("sequelize");
const config = require("../config/config");

const env = process.env.NODE_ENV || "development";
const sequelize = new Sequelize(config[env]);

const getById = async (id) => {
  const user = await User.findOne({
    where: { id },
    attributes: { exclude: ["password"] },
    include: {
      model: Address,
      as: "address",
    },
  });

  return user;
};

const getAll = async (id) => {
  const users = await User.findAll({
    include: {
      model: Address,
      as: "address",
    },
    order: [
      sequelize.literal(
        `(CASE WHEN User.id = ${id} THEN 0 ELSE 1 END), User.id ASC`
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
  city,
  street,
  number,
  district,
}) => {


  const result = await sequelize.transaction(async (t) => {
    const newUser = await User.create(
      {
        fullName,
        username,
        email,
        password,
        admin: admin === "false" ? false : true,
        image,
      },
      { transaction: t }
    );

    await Address.create(
      {
        city,
        street,
        number: Number(number),
        userId: newUser.id,
        district,
      },
      { transaction: t }
    );

    return newUser;
  });

  return { status: 201, data: result };
};

const updateUser = async ({
  id,
  fullName,
  username,
  password,
  city,
  street,
  number,
  district,
}) => {
  const user = await User.findOne({
    where: {
      id,
      password,
    },
  });

  if (!user) return { status: 401, data: { message: 'Senha incorreta' } };

  const result = await sequelize.transaction(async (t) => {
    const updatedUser = await User.update(
      {
        fullName,
        username,
      },
      {
        where: {
          id,
        },
      },
      { transaction: t }
    );

    await Address.update(
      {
        city,
        street,
        number: Number(number),
        district,
      },
      {
        where: {
          userId: user.id,
        },
      },
      { transaction: t }
    );

    return updatedUser;
  });

  return { status: 200, data: result };
};

const deleteUser = async (id) => {
  await User.destroy({
    where: {
      id,
    },
  });
  return { status: 204 };
};
module.exports = {
  getById,
  getAll,
  createNewUser,
  deleteUser,
  updateUser,
};

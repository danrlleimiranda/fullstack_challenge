const { userServices } = require("../services");

const getData = async (_req, res) => {
  const { data } = res.locals.user;

  if (data.admin) {
    const users = await userServices.getAll(data.userId);
    return res.status(200).json(users);
  }

  const user = await userServices.getById(data.userId);
  return res.status(200).json(user);
};

const createNewUser = async (req, res) => {
  const {
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
  } = req.body;


  const newUser = await userServices.createNewUser({
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
    image
  });
  
  return res.status(newUser.status).json(newUser.data);
};

const deleteUser = async (req, res) => {
  const { id } = req.params;

  const deleted = await userServices.deleteUser(id);
  return res.sendStatus(deleted.status);
};

const updateUser = async (req, res) => {
  const { id } = req.params;

  const {
    fullName,
    email,
    username,
    password,
    city,
    street,
    number,
    district,
  } = req.body;

  const updated = await userServices.updateUser({
    id,
    fullName,
    username,
    email,
    city,
    district,
    street,
    number,
    password,
  });

  return res.status(200).json(updated);
};

module.exports = {
  getData,
  createNewUser,
  deleteUser,
  updateUser,
};

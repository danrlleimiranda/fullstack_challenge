const { addNewUserSchema } = require("../schemas/addNewUser.schema");

const validateNewUser = ({ fullName, username, email, password }) => {
  const { error } = addNewUserSchema.validate({
    fullName,
    username,
    email,
    password,
  });

  if (error) return { status: 400, data: { message: error.message } };
};

module.exports = {
  validateNewUser,
};

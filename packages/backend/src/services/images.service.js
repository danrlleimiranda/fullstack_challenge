const { User } = require("../models");
const getImage = async () => {
  const images = await User.findAll({
    attributes: ["image"],
  });

  return { status: 200, data: images };
};

module.exports = {
  getImage,
};

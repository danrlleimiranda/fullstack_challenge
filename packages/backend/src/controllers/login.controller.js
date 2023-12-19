const { loginServices } = require('../services')


const login = async (req, res) => {
  const { username, password } = req.body;

  const user = await loginServices.validateLogin({ username, password })

  return res.status(user.status).json(user.data)
};


module.exports = {
    login
}

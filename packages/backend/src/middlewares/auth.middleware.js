const jwt = require("jsonwebtoken");

const secret = process.env.JWT_SECRET;

const authenticate = (req, res, next) => {
  const bearerToken = req.headers.authorization;
  let token; 

  if(bearerToken) {
    [, token] = bearerToken.split(' ')
  }

  try {
      const decoded = jwt.verify(token, secret);
      res.locals.user = decoded;
  } catch (err) {
    return res.status(401).json({ message: 'Expired or invalid token' });
  }

  next();
};

module.exports = {
    authenticate
}
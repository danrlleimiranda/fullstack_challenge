const express = require("express");
const cors = require('cors')
const { loginController } = require('./controllers');

const app = express();
app.use(express.json());
app.use(cors());


app.get('/health/status', async (req, res) => {
  return res.status(200).json({message: 'The api is healthy'})
});

app.post("/login", loginController.login);

app.use(async (error, _req, res, _next) => {
  if (error) return res.status(500).json({ message: "Something went wrong" });
});

module.exports = app;

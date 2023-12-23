const express = require("express");
const cors = require('cors');
const path = require('path');
const { loginController, userController } = require('./controllers');
const {imagesServices} = require('./services')
const { authenticate } = require("./middlewares/auth.middleware");
const multerConfig = require('./config/multerConfig');
const multer = require("multer");
const upload = multer(multerConfig)
const app = express();
app.use(express.json());
app.use(cors());
app.use('/files', express.static(path.resolve(__dirname, '..' ,'uploads')));

app.get('/health/status', async (_req, res) => {
  return res.status(200).json({message: 'The api is healthy'})
});

app.post('/login', loginController.login);

app.use(authenticate);
app.get('/me', userController.getData);
app.post('/upload', upload.single('file'), userController.createNewUser);
app.get('/images', async (_req, res) => {
 const images = await imagesServices.getImage();
 return res.status(images.status).json(images.data)
});



app.use(async (error, _req, res, _next) => {
  console.error(error.message)
  if (error) return res.status(500).json({ message: "Something went wrong" });
});

module.exports = app;

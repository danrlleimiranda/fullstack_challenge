const app = require('./app');
const https = require('https')
const fs = require('fs')

const PORT = process.env.PORT || 3001;

const options = {
    key: fs.readFileSync('/home/danrllei/chave_privada.key'),
    cert: fs.readFileSync('/home/danrllei/certificado.crt'),
  };

  const server = https.createServer(options, app);

  server.listen(PORT, () => {
    console.log(`Servidor HTTPS está escutando na porta: ${PORT}`)})
const Server = require('./server/config');


require('dotenv').config(); //Tomar todo el archivo de env


const server = new Server();


server.listen();
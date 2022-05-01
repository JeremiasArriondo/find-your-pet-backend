const Server = require('./models/server');


require('dotenv').config(); //Tomar todo el archivo de env


const server = new Server();


server.listen();
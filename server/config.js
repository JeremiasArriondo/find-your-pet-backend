const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');

class Server {
    //Creo el servidor y en la nueva instancia creo la app de express
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.userPath = '/api/user';

        // Conectar a base de datos
        this.connectDB();

        // Middlewares
        this.middlewares();
        // Rutas de mi aplicación
        this.routes();
    }

    async connectDB() {
        await dbConnection();
    }

    middlewares() {
        // Habilitacion de cors
        this.app.use( cors() );

        // Lectura y parseo del body
        this.app.use( express.json() );

        // Directorio publico
        this.app.use( express.static('public'));
    }
    
    routes() {
        this.app.use(this.userPath, require('../routes/user.route'))
    }

    listen() {
        this.app.listen( this.port, () => {
            console.log('Servidor corriendo en el puerto', this.port);
        });
    }
}


module.exports = Server;
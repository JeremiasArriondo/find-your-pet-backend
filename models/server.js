const express = require('express')

class Server {
    //Creo el servidor y en la nueva instancia creo la app de express
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        // Middlewares
        this.middlewares();
        // Rutas de mi aplicación
        this.routes();
    }

    middlewares() {
        // Directorio publico
        this.app.use( express.static('public'))
    }
    
    routes() {
        this.app.get('/api', (req, res) => {
            res.send('Hello world')
        })
    }

    listen() {
        this.app.listen( this.port, () => {
            console.log('Servidor corriendo en el puerto', this.port);
        });
    }
}


module.exports = Server;
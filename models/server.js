const express = require('express');
var cors = require('cors');
const { socketController } = require('../sockets/controller');

class Server {
    constructor() {
        this.app    = express();
        this.port   = process.env.PORT;
        this.server = require('http').createServer(this.app);
        this.io     = require('socket.io')(this.server);

        this.paths = {};

        // Middlewares
        this.middlewares();

        // Rutas aplicación
        this.routes();

        // Sockets
        this.sockets();
    }

    middlewares() {
        this.app.use(cors());
   
        this.app.use(express.static('public'));

    }

    routes() {
        // this.app.use(this.paths.auth, require('../routes/auth'));
    }

    sockets() {
        this.io.on('connection', socketController);
    }

    listen() {
        // Se levanta este server: constructor -> this.server = require('http').createServer(this.app);
        this.server.listen(this.port, () => {
            console.log('Servidor corriendo en puerto: ', process.env.PORT);
        });
    }
   
}

module.exports = Server;
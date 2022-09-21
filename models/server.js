require('../routes/usuarios');
const express = require('express');
const cors    = require('cors');


class Server {

    constructor() {
        this.app  = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios';

        //middlewares de mi aplicación
        this.middlewares();

        //rutas de mi aplicación 
        this.routes();
    }

    middlewares() {

        //CORS
        this.app.use( cors() );

        //Lectura y parseo del body
        this.app.use( express.json() );

        //directorio público
        this.app.use( express.static('public') );
    }

    routes() {
        //Middleware de las rutas
        this.app.use( this.usuariosPath, require('../routes/usuarios'));
    }


    listen() {
        this.app.listen( this.port, () => {
            console.log(' Servidor corriendo en puerto ', this.port ); 
        });
    }
}

module.exports = Server;
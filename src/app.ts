require('dotenv/config');
require('express-async-errors');

import express from 'express';
import { routes } from './routes/routes';
import errorHandler from './config/ErroHandler';
import expressPinoLogger from "express-pino-logger";
import { logger } from './config/AppLogger';

class App {

    public server: express.Application;
    isDev = process.env.NODE_ENV === 'development'

    constructor() {
        this.server = express();
        this.server.use(expressPinoLogger({ logger: logger }));
        this.middlewares();
        this.routes();
        this.server.use(errorHandler);
        this.init()
    }

    async init() {
        await this.dbInit();
    }

    middlewares() {
        this.server.use(express.json());
    }

    routes() {
        this.server.use(routes);
    }

    async dbInit() {
        logger.info("Creating database ...")

        //Incluir aqui as models do db dando init, exemplo:
        // await Event.sync({ alter: this.isDev });

        logger.info("Database initialized !")
    }
}

export default new App().server;
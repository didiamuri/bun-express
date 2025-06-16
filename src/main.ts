import 'reflect-metadata';
import './modules/loader.ts'
import http from "http";
import express from "express";
import {normalizePort} from "./utils/normalize-port.ts";
import {InversifyExpressServer} from "inversify-express-utils";
import {badUrl, cors} from "./middlewares";
import {container} from "./configs/inversify/container";
import {logger} from "./configs/logger";
import {ErrorHandler} from "./middlewares/error-handler.ts";
import {initMongo, initRedis} from "./configs/database";
import {performance} from 'perf_hooks';

const start = performance.now(); // ⏱️ début global
const port = normalizePort(process.env.PORT ?? '3000');

const server = new InversifyExpressServer(container, null, {
    rootPath: '/api/v1'
});

server.setConfig(app => {
    app.set('trust proxy', true);
    app.set('port', port);

    app.use(express.json());
    app.use(express.urlencoded({extended: true}));
    app.use(cors);

    app.use((req, _res, next) => {
        logger.info(`${req.method} ${req.originalUrl}`, {label: 'HTTP'});
        next();
    });
});

server.setErrorConfig(app => {
    app.all(/^.*$/, badUrl);

    const errorMiddleware = container.get<ErrorHandler>("ErrorHandler");
    app.use(errorMiddleware.handler);
});

const app = server.build();

const httpServer = http.createServer(app);

(async () => {
    const t0 = performance.now();
    await initMongo();
    const t1 = performance.now();
    logger.info(`✅ MongoDB connected in ${(t1 - t0).toFixed(2)}ms`);

    const t2 = performance.now();
    await initRedis();
    const t3 = performance.now();
    logger.info(`✅ Redis connected in ${(t3 - t2).toFixed(2)}ms`);

    httpServer.listen(port, () => {
        const end = performance.now();
        const totalDuration = (end - start).toFixed(2);
        logger.info(`🚀 Server is running on port ${port}`);
        logger.info(`🕒 Total startup time: ${totalDuration}ms`);
    });
})();

process.on('unhandledRejection', reason => {
    logger.error('💥 Unhandled Rejection:', reason);
    process.exit(1);
});

process.on('uncaughtException', err => {
    logger.error('💥 Uncaught Exception:', err);
    process.exit(1);
});

export {app};
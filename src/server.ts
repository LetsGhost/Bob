import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';
import cookieParser from 'cookie-parser';
dotenv.config();

// Routes
import { connectToDatabase, logDatabaseStats } from "./config/db.js";
import { connectToRedis } from './config/redis.js';

import bugReportRoutes from "./app/routes/BugReportRoute.js";
import redisRoutes from "./app/routes/RedisRoutes.js";
import logger from './config/winstonLogger.js';

const server = express();

server.use(bodyParser.json());
server.use(cors());
server.use(cookieParser());

server.use("/bugReport", bugReportRoutes)
server.use("/redis", redisRoutes)

connectToDatabase()
connectToRedis()

setInterval(logDatabaseStats, 1000 * 60 * 60 * 24);
logDatabaseStats();

server.listen(process.env.PORT, () => {
    logger.info(`Server listening on port ${process.env.PORT}`, {service: "Server"});
});
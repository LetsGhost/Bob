import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';
import cookieParser from 'cookie-parser';
dotenv.config();

// Routes
import { connectToDatabase, } from "./config/db";
import { connectToRedis } from './config/redis';

import bugReportRoutes from "./app/routes/BugReportRoute";
import redisRoutes from "./app/routes/RedisRoutes";

const server = express();

server.use(bodyParser.json());
server.use(cors());
server.use(cookieParser());

server.use("/bugReport", bugReportRoutes)
server.use("/redis", redisRoutes)

connectToDatabase()
connectToRedis()

server.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`)
});
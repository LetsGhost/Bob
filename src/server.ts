import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';
dotenv.config();

// Routes
import { connectToDatabase, } from "./config/db";
import bugReportRoutes from "./app/routes/BugReportRoute";

const server = express();

server.use(bodyParser.json());
server.use(cors());

server.use("/bugReport", bugReportRoutes)

connectToDatabase()

server.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`)
});
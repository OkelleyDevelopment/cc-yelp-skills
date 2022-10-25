import * as dotenv from "dotenv";
import cors from "cors";
import express, { Application } from "express";
import helmet from "helmet";

import { logger } from "../middleware/logger";
import { router as PulseRouter } from "../api/pulse/pulse";
import { router as ReviewRouter } from "../api/reviews/reviews";

const development = "development";
const isDevelopment = process.env.NODE_ENV === development;

if (isDevelopment) {
  dotenv.config();
}

// Our base express server
const server: Application = express();

// Configure the server 
server.use(cors());
server.use(helmet()); // provides some extra security 
server.use(express.json());

// Middlewares 
server.use(logger) // log requests to our server

// Allow us to test the server is active without needing to see complex data
server.use("/", PulseRouter);
server.use('/reviews/', ReviewRouter)

export default server;

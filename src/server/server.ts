import * as dotenv from "dotenv";
import cors from "cors";
import express, { Application } from "express";
import helmet from "helmet";

import { router as PulseRouter } from "../api/pulse/pulse";

// TODO: Write a logger function

const development = "development";
const isDevelopment = process.env.NODE_ENV === development;

if (isDevelopment) {
  dotenv.config();
}

const server: Application = express();

server.use(cors());
server.use(helmet());
server.use(express.json());

// TODO: Use the logger middleware here

// Allow us to test the server is active without needing to see complex data
server.use("/", PulseRouter);
export default server;

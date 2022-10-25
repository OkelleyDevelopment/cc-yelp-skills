import { NextFunction, Request, Response } from "express"

// Simple logging function to allow us to set what requests are 
// being processed
export function logger(req: Request, _res: Response, next: NextFunction) {
  console.log(
    `[${new Date().toISOString()}] ${req.method} to ${req.url} from 
                ${req.get("origin")} req body ${req.body}`,
    { ...req.headers }
  );
  next();
}
import { Request, Response, NextFunction } from "express";
import { Result, sendResult } from "../utils/Result";

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  console.error("[Global Error Handler]", err);

  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  
  // Create a fail result
  const result = Result.fail(message);
  
  sendResult(res, statusCode, result);
};

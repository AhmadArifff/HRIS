import { Request, Response } from "express";
import { prisma } from "@hris/database";
import { redis } from "../config/redis";
import { Result, sendResult } from "../utils/Result";

export const checkHealth = async (req: Request, res: Response) => {
  try {
    // Check DB Connection
    await prisma.$queryRaw`SELECT 1`;
    
    // Check Redis Connection
    await redis.ping();

    const data = {
      status: "OK",
      db: "Connected",
      redis: "Connected",
      timestamp: new Date().toISOString()
    };

    const result = Result.ok(data, "System is healthy");
    sendResult(res, 200, result);
  } catch (error: any) {
    const result = Result.fail(`Health check failed: ${error.message}`);
    sendResult(res, 500, result);
  }
};

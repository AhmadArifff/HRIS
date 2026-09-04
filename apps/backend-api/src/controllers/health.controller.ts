import { Request, Response } from "express";
import { prisma } from "@hris/database";
import { redis } from "../config/redis";
import { Result, sendResult } from "../utils/Result";

export const checkHealth = async (req: Request, res: Response) => {
  let dbStatus = "Disconnected";
  let redisStatus = "Disconnected";

  try {
    await prisma.$queryRaw`SELECT 1`;
    dbStatus = "Connected";
  } catch (err: any) {
    dbStatus = `Unavailable (${err.code || 'offline'})`;
  }

  try {
    await redis.ping();
    redisStatus = "Connected";
  } catch (err: any) {
    redisStatus = `Unavailable (${err.message})`;
  }

  const data = {
    status: "ok",
    db: dbStatus,
    redis: redisStatus,
    timestamp: new Date().toISOString()
  };

  sendResult(res, 200, Result.ok(data, "System health report"));
};

import { Request, Response } from "express";
import { redis } from "../config/redis";
import { Result, sendResult } from "../utils/Result";

export const getRedisStats = async (req: Request, res: Response) => {
  try {
    const rawInfo = await redis.info();
    
    // Parse raw info string into a key-value object
    const lines = rawInfo.split("\r\n");
    const parsed: Record<string, string> = {};
    
    for (const line of lines) {
      if (line && !line.startsWith("#")) {
        const [key, value] = line.split(":");
        if (key && value) {
          parsed[key] = value;
        }
      }
    }

    const stats = {
      used_memory_human: parsed["used_memory_human"] || "N/A",
      connected_clients: parsed["connected_clients"] || "N/A",
      uptime_in_days: parsed["uptime_in_days"] || "N/A",
      keyspace_hits: parsed["keyspace_hits"] || "0",
      keyspace_misses: parsed["keyspace_misses"] || "0",
      redis_version: parsed["redis_version"] || "N/A",
      os: parsed["os"] || "N/A",
      raw_output: rawInfo
    };

    const result = Result.ok(stats, "Berhasil mengambil metrik Redis");
    return sendResult(res, 200, result);
  } catch (error: any) {
    const result = Result.fail(error.message || "Gagal mengambil metrik Redis");
    return sendResult(res, 500, result);
  }
};

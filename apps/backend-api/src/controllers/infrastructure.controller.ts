import { Request, Response } from "express";
import { redis } from "../config/redis";
import { Result, sendResult } from "../utils/Result";

// Helper: format bytes to human readable
function formatBytes(bytes: number): string {
  if (bytes === 0) return "0 B";
  const sizes = ["B", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  const val = bytes / Math.pow(1024, i);
  return `${val < 10 ? val.toFixed(3) : val < 100 ? val.toFixed(2) : val.toFixed(1)}${sizes[i]}`;
}

// Upstash Free Tier plan limits (constants)
const UPSTASH_FREE_TIER = {
  maxCommandsPerMonth: 500_000,
  maxBandwidthBytes: 50 * 1024 * 1024 * 1024, // 50 GB
  maxStorageBytes: 256 * 1024 * 1024,           // 256 MB
  planName: "Free Tier (Pay As You Go)",
};

export const getRedisStats = async (req: Request, res: Response) => {
  try {
    const rawInfo = await redis.info();
    
    // Parse raw info string into a key-value object
    const lines = rawInfo.split("\r\n");
    const parsed: Record<string, string> = {};
    
    for (const line of lines) {
      if (line && !line.startsWith("#")) {
        const colonIdx = line.indexOf(":");
        if (colonIdx > 0) {
          const key = line.substring(0, colonIdx);
          const value = line.substring(colonIdx + 1);
          parsed[key] = value;
        }
      }
    }

    // --- Extract real metrics from Redis INFO ---
    const totalCommandsProcessed = parseInt(parsed["total_commands_processed"] || "0", 10);
    const usedMemoryBytes = parseInt(parsed["used_memory"] || "0", 10);
    const totalNetInputBytes = parseInt(parsed["total_net_input_bytes"] || "0", 10);
    const totalNetOutputBytes = parseInt(parsed["total_net_output_bytes"] || "0", 10);
    const totalBandwidthBytes = totalNetInputBytes + totalNetOutputBytes;
    const keyspaceHits = parseInt(parsed["keyspace_hits"] || "0", 10);
    const keyspaceMisses = parseInt(parsed["keyspace_misses"] || "0", 10);

    // Approximate reads vs writes:
    // keyspace_hits + keyspace_misses = read commands, remainder = write/admin commands
    const readCommands = keyspaceHits + keyspaceMisses;
    const writeCommands = Math.max(0, totalCommandsProcessed - readCommands);

    // Bandwidth health check
    const bandwidthPercent = UPSTASH_FREE_TIER.maxBandwidthBytes > 0
      ? (totalBandwidthBytes / UPSTASH_FREE_TIER.maxBandwidthBytes) * 100
      : 0;
    const storagePercent = UPSTASH_FREE_TIER.maxStorageBytes > 0
      ? (usedMemoryBytes / UPSTASH_FREE_TIER.maxStorageBytes) * 100
      : 0;

    // Upstash cost estimation (free tier: $0.00 if under limits)
    const commandsCost = totalCommandsProcessed > UPSTASH_FREE_TIER.maxCommandsPerMonth
      ? ((totalCommandsProcessed - UPSTASH_FREE_TIER.maxCommandsPerMonth) / 100_000) * 0.2
      : 0;
    const storageCost = usedMemoryBytes > UPSTASH_FREE_TIER.maxStorageBytes
      ? ((usedMemoryBytes - UPSTASH_FREE_TIER.maxStorageBytes) / (1024 * 1024 * 1024)) * 0.25
      : 0;
    const estimatedCost = commandsCost + storageCost;

    const stats = {
      // Core Redis INFO metrics
      used_memory_human: parsed["used_memory_human"] || "N/A",
      connected_clients: parsed["connected_clients"] || "N/A",
      uptime_in_days: parsed["uptime_in_days"] || "N/A",
      keyspace_hits: String(keyspaceHits),
      keyspace_misses: String(keyspaceMisses),
      redis_version: parsed["redis_version"] || "N/A",
      os: parsed["os"] || "N/A",
      raw_output: rawInfo,

      // Upstash Quota metrics (real data from Redis INFO)
      upstash: {
        commands: {
          total: totalCommandsProcessed,
          reads: readCommands,
          writes: writeCommands,
          limit: UPSTASH_FREE_TIER.maxCommandsPerMonth,
          limitLabel: "500k per month",
        },
        bandwidth: {
          usedBytes: totalBandwidthBytes,
          usedHuman: formatBytes(totalBandwidthBytes),
          limitBytes: UPSTASH_FREE_TIER.maxBandwidthBytes,
          limitHuman: "50 GB",
          percent: parseFloat(bandwidthPercent.toFixed(2)),
          status: bandwidthPercent < 80 ? "ok" : bandwidthPercent < 95 ? "warning" : "critical",
        },
        storage: {
          usedBytes: usedMemoryBytes,
          usedHuman: formatBytes(usedMemoryBytes),
          limitBytes: UPSTASH_FREE_TIER.maxStorageBytes,
          limitHuman: "256 MB",
          percent: parseFloat(storagePercent.toFixed(2)),
          status: storagePercent < 80 ? "ok" : storagePercent < 95 ? "warning" : "critical",
        },
        cost: {
          estimated: parseFloat(estimatedCost.toFixed(2)),
          label: estimatedCost > 0 ? `$${estimatedCost.toFixed(2)}` : "$0.00",
          plan: UPSTASH_FREE_TIER.planName,
        },
      },
    };

    const result = Result.ok(stats, "Berhasil mengambil metrik Redis");
    return sendResult(res, 200, result);
  } catch (error: any) {
    const result = Result.fail(error.message || "Gagal mengambil metrik Redis");
    return sendResult(res, 500, result);
  }
};

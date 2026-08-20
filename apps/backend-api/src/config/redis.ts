import Redis from "ioredis";

// Use environment variable or fallback to local default
const redisUrl = process.env.REDIS_URL || "redis://127.0.0.1:6379";

export const redis = new Redis(redisUrl, {
  maxRetriesPerRequest: null,
  retryStrategy(times) {
    // Reconnect after 3 seconds if connection lost
    return Math.min(times * 50, 3000);
  },
});

redis.on("connect", () => {
  console.log("Redis client connected successfully");
});

redis.on("error", (err) => {
  console.error("Redis connection error:", err);
});

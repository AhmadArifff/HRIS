import rateLimit from "express-rate-limit";

// Rate limiting middleware to protect against DDoS / brute-force
export const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  message: {
    success: false,
    data: null,
    error: "Too Many Requests",
    message: "You have exceeded the 100 requests in 15 mins limit!",
  },
});

export const attendanceLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 10, // Limit each IP to 10 attendance requests per minute
  message: {
    success: false,
    data: null,
    error: "Too Many Requests",
    message: "Please wait a moment before trying to clock in/out again.",
  },
});

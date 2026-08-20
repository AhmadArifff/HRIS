import "./env";
import express, { Application } from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { errorHandler } from "./middlewares/errorHandler";
import { globalLimiter } from "./middlewares/rateLimiter";
import { checkHealth } from "./controllers/health.controller";
import { getRedisStats } from "./controllers/infrastructure.controller";

const app: Application = express();
const PORT = process.env.PORT || 3002;

// 1. Security & Global Middlewares
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

// 2. Global Rate Limiter
app.use("/api", globalLimiter);

// 3. Routes
app.get("/api/health", checkHealth);
app.get("/api/infrastructure/redis", getRedisStats);

// 4. Fallback 404
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: "Not Found",
    message: "API endpoint does not exist",
  });
});

// 5. Centralized Error Handling
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`HRIS Backend API is running on http://localhost:${PORT}`);
});

import "./env";
import express, { Application } from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { errorHandler } from "./middlewares/errorHandler";
import { globalLimiter } from "./middlewares/rateLimiter";
import { checkHealth } from "./controllers/health.controller";
import { getRedisStats } from "./controllers/infrastructure.controller";
import { getEmployees, createEmployee } from "./controllers/employee.controller";
import { getDepartments, createDepartment, updateDepartment, deleteDepartment, getPositions, createPosition, updatePosition, deletePosition } from "./controllers/master.controller";
import { createApplicant } from "./controllers/applicant.controller";
import { clockIn } from "./controllers/attendance.controller";

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
app.get("/api/employees", getEmployees);
app.post("/api/employees", createEmployee);

app.get("/api/departments", getDepartments);
app.post("/api/departments", createDepartment);
app.put("/api/departments/:id", updateDepartment);
app.delete("/api/departments/:id", deleteDepartment);

app.get("/api/positions", getPositions);
app.post("/api/positions", createPosition);
app.put("/api/positions/:id", updatePosition);
app.delete("/api/positions/:id", deletePosition);

app.post("/api/applicants", createApplicant);

app.post("/api/attendance/clock-in", clockIn);

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

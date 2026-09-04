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
import {
  getDepartments,
  createDepartment,
  updateDepartment,
  deleteDepartment,
  getPositions,
  createPosition,
  updatePosition,
  deletePosition,
} from "./controllers/master.controller";
import { getApplicants, createApplicant, updateApplicantStage } from "./controllers/applicant.controller";
import { clockIn, getAttendances } from "./controllers/attendance.controller";
import { getLeaveRequests, createLeaveRequest, updateLeaveStatus } from "./controllers/leave.controller";
import { getPayrollComponents, createPayrollComponent } from "./controllers/payroll.controller";
import { getDashboardStats } from "./controllers/dashboard.controller";
import { enrollFace, getBiometricStatus, resetBiometricProfile } from "./controllers/biometric.controller";

const app: Application = express();

// 1. Security & Global Middlewares
app.use(helmet());
app.use(cors({ origin: "*" }));
app.use(express.json({ limit: "20mb" }));
app.use(express.urlencoded({ extended: true, limit: "20mb" }));
app.use(morgan("dev"));

// 2. Global Rate Limiter
app.use("/api", globalLimiter);

// 3. Routes
app.get("/api/health", checkHealth);
app.get("/api/infrastructure/redis", getRedisStats);

// Biometrics & Face Recognition
app.post("/api/biometrics/enroll", enrollFace);
app.get("/api/biometrics/status/:employeeId", getBiometricStatus);
app.delete("/api/biometrics/:employeeId", resetBiometricProfile);

// Employees
app.get("/api/employees", getEmployees);
app.post("/api/employees", createEmployee);

// Master Data
app.get("/api/departments", getDepartments);
app.post("/api/departments", createDepartment);
app.put("/api/departments/:id", updateDepartment);
app.delete("/api/departments/:id", deleteDepartment);

app.get("/api/positions", getPositions);
app.post("/api/positions", createPosition);
app.put("/api/positions/:id", updatePosition);
app.delete("/api/positions/:id", deletePosition);

// Time & Attendance
app.get("/api/attendance", getAttendances);
app.post("/api/attendance/clock-in", clockIn);

// Leave Requests
app.get("/api/leave", getLeaveRequests);
app.post("/api/leave", createLeaveRequest);
app.put("/api/leave/:id/status", updateLeaveStatus);

// Recruitment ATS
app.get("/api/applicants", getApplicants);
app.post("/api/applicants", createApplicant);
app.put("/api/applicants/:id/status", updateApplicantStage);

// Payroll
app.get("/api/payroll/components", getPayrollComponents);
app.post("/api/payroll/components", createPayrollComponent);

// Dashboard
app.get("/api/dashboard/stats", getDashboardStats);

// 4. Fallback 404
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: "Not Found",
    message: `API endpoint ${req.originalUrl} does not exist`,
  });
});

// 5. Centralized Error Handling
app.use(errorHandler);

export default app;

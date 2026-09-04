import app from "./app";

const PORT = process.env.PORT || 3002;

process.on("unhandledRejection", (reason, promise) => {
  console.error("[Process] Unhandled Rejection at:", promise, "reason:", reason);
});

process.on("uncaughtException", (error) => {
  console.error("[Process] Uncaught Exception:", error);
});

const server = app.listen(PORT, () => {
  console.log(`HRIS Backend API is running on http://localhost:${PORT}`);
});

server.on("error", (err: any) => {
  if (err.code === "EADDRINUSE") {
    console.warn(`[Server] Port ${PORT} already in use, keeping existing process.`);
  } else {
    console.error("[Server] Listen error:", err);
  }
});

import dotenv from "dotenv";
import path from "path";

// Load .env from root of the monorepo
dotenv.config({ path: path.resolve(__dirname, "../../../.env") });

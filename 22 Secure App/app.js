import express from "express";
import helmet from "helmet";
import cors from "cors";
import csurf from "csurf";
import rateLimit from "express-rate-limit";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import { logger, stream } from "./config/logger.js";
import authRoutes from "./routes/auth.routes.js";

dotenv.config();

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(helmet());
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: ["http://localhost:3000"], credentials: true }));
app.use(morgan("combined", { stream }));

// Rate limit
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }));

// CSRF protection
const csrfProtection = csurf({
  cookie: { httpOnly: true, sameSite: "lax", secure: false },
});
app.use(csrfProtection);

// CSRF Token endpoint
app.get("/api/csrf-token", (req, res) => {
  res.json({ csrfToken: req.csrfToken() });
});

// Routes
app.use("/api/auth", authRoutes);

// Error handler
app.use((err, req, res, next) => {
  logger.error(err.stack);
  res.status(500).json({ message: "Internal server error" })
});

export default app;
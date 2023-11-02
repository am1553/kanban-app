import express from "express";
import router from "./router";
import morgan from "morgan";
import cors from "cors";
import { protect } from "./modules/auth";
import { createUser, signin } from "./handlers/users";
import prisma from "./db";
const app = express();
app.use(cors({ credentials: true, origin: "http://localhost:5173" }));
app.use(morgan("dev"));
app.use(express.json());

// Middleware to check database connection
const checkDatabaseConnection = async (req, res, next) => {
  try {
    // Use Prisma to make a dummy query to check the database connection
    await prisma.$queryRaw`SELECT 1`;

    // If the query is successful, the database is connected
    next();
  } catch (error) {
    // If there is an error, the database connection failed
    return res.status(500).json({ error: "Database connection failed" });
  }
};

// Apply the middleware to all routes
app.use(checkDatabaseConnection);

app.use("/api/v1", protect, router);
app.post("/user", createUser);
app.post("/signin", signin);

export default app;

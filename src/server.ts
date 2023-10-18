import express from "express";
import router from "./router";
import morgan from "morgan";
import cors from "cors";
import { protect } from "./modules/auth";
import { createUser, signin } from "./handlers/users";
const app = express();
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use("/", (req, res) => {
  res.json({ message: "started" });
});
app.use("/api/v1", protect, router);
app.post("/user", createUser);
app.post("/signin", signin);

export default app;

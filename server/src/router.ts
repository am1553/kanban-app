import { Router } from "express";

const router = Router();

/**
 * BOARDS
 */
router.get("/boards", (req, res) => {
  res.status(200).json({ message: "hello" });
});
router.get("/boards/:id", () => {});
router.put("/boards/:id", () => {});
router.post("/boards", () => {});
router.delete("/boards/:id", () => {});

/*
 * COLUMNS
 */

router.get("/columns", () => {});
router.get("/columns/:id", () => {});
router.put("/columns/:id", () => {});
router.post("/columns", () => {});
router.delete("/columns/:id", () => {});

/**
 * TASKS
 */

router.get("/tasks", () => {});
router.get("/tasks/:id", () => {});
router.put("/tasks/:id", () => {});
router.post("/tasks", () => {});
router.delete("/tasks/:id", () => {});

/**
 * SUBTASKS
 */

router.get("/subtasks", () => {});
router.get("/subtasks/:id", () => {});
router.put("/subtasks/:id", () => {});
router.post("/subtasks", () => {});
router.delete("/subtasks/:id", () => {});

export default router;

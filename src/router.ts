import { Router } from "express";
import {
  createBoard,
  deleteBoard,
  getBoard,
  getBoards,
  updateBoard,
} from "./handlers/board";
import {
  createTask,
  deleteTask,
  getTask,
  getTasks,
  updateTask,
} from "./handlers/task";

const router = Router();

/**
 * BOARDS
 */
router.get("/boards", getBoards);
router.get("/boards/:id", getBoard);
router.put("/boards/:id", updateBoard);
router.post("/boards", createBoard);
router.delete("/boards/:id", deleteBoard);

/**
 * TASKS
 */

router.get("/tasks", getTasks);
router.get("/tasks/:id", getTask);
router.patch("/tasks/:id", updateTask);
router.post("/tasks", createTask);
router.delete("/tasks/:id", deleteTask);

/**
 * SUBTASKS
 */

router.get("/subtasks", () => {});
router.get("/subtasks/:id", () => {});
router.put("/subtasks/:id", () => {});
router.post("/subtasks", () => {});
router.delete("/subtasks/:id", () => {});

export default router;

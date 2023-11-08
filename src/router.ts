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
import {
  createSubtask,
  deleteSubtask,
  updateSubtask,
} from "./handlers/subtasks";
import { createColumn, deleteColumn, updateColumn } from "./handlers/columns";

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
 * COLUMNS
 */

router.post("columns", createColumn);
router.put("columns/:id", updateColumn);
router.delete("columns/:id", deleteColumn);

/**
 * TASKS
 */

router.get("/tasks", getTasks);
router.get("/tasks/:id", getTask);
router.put("/tasks/:id", updateTask);
router.post("/tasks", createTask);
router.delete("/tasks/:id", deleteTask);

/**
 * SUBTASKS
 */

router.put("/subtasks/:id", updateSubtask);
router.post("/subtasks", createSubtask);
router.delete("/subtasks/:id", deleteSubtask);

export default router;

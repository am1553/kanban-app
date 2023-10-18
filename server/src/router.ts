import { Router } from "express";
import {
  createBoard,
  deleteBoard,
  getBoard,
  getBoards,
  updateBoard,
} from "../handlers/board";

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

router.get("/tasks", () => {});
router.get("/tasks/:id", () => {});
router.patch("/tasks/:id", () => {});
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

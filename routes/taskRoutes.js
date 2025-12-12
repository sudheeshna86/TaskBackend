// routes/taskRoutes.js
import express from "express";
import {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask
} from "../controllers/taskController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(protect); // all routes protected

router.get("/", getTasks);
router.post("/", createTask);
router.get("/:id", getTask);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);

export default router;

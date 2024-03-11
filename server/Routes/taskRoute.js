import express from "express";
import { requireSignIn } from "../middlewares/authMiddleWare.js";
import {
  createTaskController,
  deleteTaskController,
  getAllTasksController,
  getSingleTaskController,
  updateTaskController
} from "../controllers/taskController.js";

const router = express.Router();

//routes
//create task
router.post(
  "/create-task",
  requireSignIn,
  createTaskController
);

// update task
router.put(
  "/update-task/:id",
  requireSignIn,
  updateTaskController
);

//getAll tasks
router.get('/get-task', requireSignIn, getAllTasksController)

//single task
router.get('/single-task/:slug', requireSignIn, getSingleTaskController)

// delete task
router.delete('/delete-task/:id', requireSignIn, deleteTaskController)


export default router;
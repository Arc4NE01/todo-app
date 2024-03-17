import TaskModel from "../model/taskModel.js";

export const createTaskController = async (req, res) => {
  try {
    const {
      title,
      description,
      priority,
      estimatedStartDate,
      estimatedEndDate,
      category,
    } = req.body;

    if (!title) {
      return res.status(400).send({ message: "Title is required" });
    }

    const userId = req.user._id; 

    const newTask = await TaskModel.create({
      title,
      description,
      priority,
      estimatedStartDate,
      estimatedEndDate,
      category,
      assignedTo: userId,
    });

    res.status(201).send({
      success: true,
      message: "New task created successfully",
      task: newTask,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while creating task",
    });
  }
};

export const getAllTasksController = async (req, res) => {
  try {
    const assignedTo = req.query.assignedTo;
    let query = {};

    if (assignedTo) {
      query.assignedTo = assignedTo;
    }

    const tasks = await TaskModel.find(query);
    res.status(200).send({
      success: true,
      message: "All tasks list",
      tasks,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while getting all tasks",
    });
  }
};

export const getSingleTaskController = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await TaskModel.findById(id);
    if (!task) {
      return res.status(404).send({ message: "Task not found" });
    }
    res.status(200).send({
      success: true,
      message: "Get single task successful",
      task,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while getting single task",
    });
  }
};

export const updateTaskController = async (req, res) => {
  try {
    const { id } = req.params;
    const { task } = req.body;
    const updatedTask = await TaskModel.findByIdAndUpdate(
      id,
      { task },
      { new: true }
    );
    if (!updatedTask) {
      return res.status(404).send({ message: "Task not found" });
    }
    res.status(200).send({
      success: true,
      message: "Task updated successfully",
      task: updatedTask,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while updating task",
    });
  }
};

export const deleteTaskController = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTask = await TaskModel.findByIdAndDelete(id);
    if (!deletedTask) {
      return res.status(404).send({ message: "Task not found" });
    }
    res.status(200).send({
      success: true,
      message: "Task deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while deleting task",
    });
  }
};

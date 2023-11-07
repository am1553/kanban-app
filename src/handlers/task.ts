import prisma from "../db";

/**
 * Create a new task
 */
export const createTask = async (req, res) => {
  if (req.body.title === "") {
    res.status(401).json({ message: "Title cannot be empty." });
  }
  try {
    const newTask = await prisma.tasks.create({
      data: {
        title: req.body.title,
        description: req.body.description,
        columnID: req.body.columnID,
        subtasks: {
          create: req.body.subtasks,
        },
      },
      include: { subtasks: true },
    });

    res.send({ data: newTask });
  } catch (error) {
    res.status(401).json({ message: "Failed to create task.", error });
  }
};

/**
 * Get all tasks in a column
 */

export const getTasks = async (req, res) => {
  try {
    const tasks = await prisma.tasks.findMany({
      where: { columnID: req.body.columnID },
      include: { subtasks: true },
    });

    res.send({ data: tasks });
  } catch (error) {
    res.status(401).json({ message: "Failed to retrieve tasks." });
  }
};

/**
 * Get a task
 */

export const getTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await prisma.tasks.findUnique({
      where: { id },
      include: { subtasks: true },
    });

    res.send({ data: task });
  } catch (error) {
    res.status(401).json({ message: "Failed to retrieve task." });
  }
};

/**
 * Update a task
 */

export const updateTask = async (req, res) => {
  const { id: taskID } = req.params;
  try {
    const updatedTask = await prisma.tasks.update({
      where: {
        id: taskID,
      },
      data: {
        title: req.body.title,
        columnID: req.body.columnID,
        description: req.body.description,
      },
      include: {
        subtasks: true,
      },
    });

    res.send({ data: updatedTask });
  } catch (error) {
    res.status(401).json({ message: "Failed to update task." });
  }
};

/**
 * Delete a task
 */

export const deleteTask = async (req, res) => {
  const { id: taskID } = req.params;

  try {
    await prisma.subtask.deleteMany({
      where: {
        taskID,
      },
    });

    const deletedTask = await prisma.tasks.delete({
      where: { id: taskID },
    });

    res.send({ data: deletedTask, message: "task deleted" });
  } catch (error) {
    res.status(401).json({ message: "Failed to delete task." });
  }
};

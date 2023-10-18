import prisma from "../db";

/**
 * Create a new task
 */
export const createTask = async (req, res) => {
  try {
    const newTask = await prisma.tasks.create({
      data: {
        title: req.body.title,
        columnID: req.body.columnID,
        subtasks: {
          create: req.body.subtasks,
        },
      },
      include: { subtasks: true },
    });

    res.send({ data: newTask });
  } catch (error) {
    res.status(401).json({ message: "Failed to create task." });
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
  const { subtasks } = req.body;
  subtasks
    .filter((subtask) => !subtask.id)
    .map(async (subtask) => {
      try {
        await prisma.subtask.create({
          data: { ...subtask, taskID },
        });
      } catch (error) {
        res.status(401).json({ message: "Failed to create the new subtask." });
      }
    });

  subtasks
    .filter((subtask) => subtask.id)
    .map(async (subtask) => {
      console.log(subtask, "existing");
      try {
        await prisma.subtask.update({
          where: {
            id: subtask.id,
          },
          data: subtask,
        });
      } catch (error) {
        res.status(401).json({ message: "Failed to update the subtask." });
      }
    });

  try {
    const updatedTask = await prisma.tasks.update({
      where: {
        id: taskID,
      },
      data: {
        title: req.body.title,
        columnID: req.body.columnID,
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

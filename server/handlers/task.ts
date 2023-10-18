import prisma from "../db";

/**
 * Create a new task
 */
export const createTask = async (req, res) => {
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
};

/**
 * Get all tasks in a column
 */

export const getTasks = async (req, res) => {
  const tasks = await prisma.tasks.findMany({
    where: { columnID: req.body.columnID },
    include: { subtasks: true },
  });

  res.send({ data: tasks });
};

/**
 * Get a task
 */

export const getTask = async (req, res) => {
  const { id } = req.params;
  const task = await prisma.tasks.findUnique({
    where: { id },
    include: { subtasks: true },
  });

  res.send({ data: task });
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
      console.log(subtask, "new");
      await prisma.subtask.create({
        data: { ...subtask, taskID },
      });
    });

  subtasks
    .filter((subtask) => subtask.id)
    .map(async (subtask) => {
      console.log(subtask, "existing");
      await prisma.subtask.update({
        where: {
          id: subtask.id,
        },
        data: subtask,
      });
    });

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
};

/**
 * Delete a task
 */

export const deleteTask = async (req, res) => {
  const { id: taskID } = req.params;
  await prisma.subtask.deleteMany({
    where: {
      taskID,
    },
  });

  const deletedTask = await prisma.tasks.delete({
    where: { id: taskID },
  });

  res.send({ data: deletedTask, message: "task deleted" });
};

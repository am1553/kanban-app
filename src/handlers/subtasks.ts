import prisma from "../db";

/**
 * Create a new subtask
 */
export const createSubtask = async (req, res) => {
  if (req.body.title === "") {
    res.status(401).json({ message: "Title cannot be empty." });
  }
  try {
    const newSubtask = await prisma.subtask.create({
      data: {
        title: req.body.title,
        isComplete: req.body.isComplete,
        taskID: req.body.taskID,
      },
    });

    res.send({ data: newSubtask });
  } catch (error) {
    res.status(401).json({ message: "Failed to create subtask.", error });
  }
};

/**
 * Update a subtask
 */

export const updateSubtask = async (req, res) => {
  const { id: subtaskID } = req.params;

  try {
    const updatedSubtask = await prisma.subtask.update({
      where: {
        id: subtaskID,
      },
      data: {
        title: req.body.title,
        isComplete: req.body.isComplete,
      },
    });

    res.send({ data: updatedSubtask });
  } catch (error) {
    res.status(401).json({ message: "Failed to update subtask.", error });
  }
};

/**
 * Delete a subtask
 */

export const deleteSubtask = async (req, res) => {
  const { id: subtaskID } = req.params;

  try {
    const deletedSubtask = await prisma.subtask.delete({
      where: {
        id: subtaskID,
      },
    });

    res.send({ data: deletedSubtask, message: "subtask deleted" });
  } catch (error) {
    res.status(401).json({ message: "Failed to delete subtask." });
  }
};

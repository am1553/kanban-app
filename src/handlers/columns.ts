import prisma from "../db";

export const createColumn = async (req, res) => {
  const { boardID, name, color } = req.body;
  try {
    const column = await prisma.columns.create({
      data: {
        name,
        color,
        boardID,
      },
    });

    res.json({
      data: {
        column,
      },
    });
  } catch (error) {
    res
      .status(401)
      .json({ message: "Failed to create board.", data: req.body, error });
  }
};

export const updateColumn = async (req, res) => {
  const { id } = req.params;
  const { name, color } = req.body;

  try {
    const updatedColumn = await prisma.columns.update({
      where: {
        id,
      },
      data: { name, color },
    });
    res.json({
      data: {
        updatedColumn,
      },
    });
  } catch (error) {
    res
      .status(401)
      .json({ message: "Failed to create board.", data: req.body, error });
  }
};

export const deleteColumn = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedColumn = await prisma.columns.delete({
      where: {
        id,
      },
    });
    res.json({
      data: {
        deletedColumn,
      },
    });
  } catch (error) {
    res
      .status(401)
      .json({ message: "Failed to create board.", data: req.body, error });
  }
};

import prisma from "../db";

export const createColumn = async (req, res) => {
  const { boardID } = req.params;
  const columns: { name: string; color: string; boardID: string }[] =
    req.body.columns.map((col) => ({ ...col, boardID }));

  try {
    const column = await prisma.columns.createMany({
      data: columns,
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
  const { boardID } = req.params;
  const columns: { name: string; color: string; boardID: string }[] =
    req.body.columns.map((col) => ({ ...col, boardID }));

  try {
    const updatedColumn = await prisma.columns.updateMany({
      data: columns,
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
  const { boardID } = req.params;
  const columns: {
    id: string;
    name: string;
    color: string;
    boardID: string;
  }[] = req.body.columns.map((col) => ({ ...col, boardID }));
  const columnIDs = columns.map((col) => col.id);
  try {
    for (const columnID of columnIDs) {
      await prisma.columns.deleteMany({
        where: {
          id: columnID,
          boardID,
        },
      });
    }

    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while deleting columns");
  }
};

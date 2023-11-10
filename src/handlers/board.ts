import prisma from "../db";
/**
 * GET ALL BOARDS
 */
export const getBoards = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: req.user.id,
      },
      include: {
        boards: {
          orderBy: {
            createdAt: "asc",
          },
          include: {
            columns: {
              orderBy: {
                createdAt: "asc",
              },
            },
          },
        },
      },
    });
    res.status(200).json({ data: user.boards });
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve boards.", error });
  }
};

/**
 * GET BOARD
 */
export const getBoard = async (req, res) => {
  const { id: boardID } = req.params;

  try {
    const board = await prisma.board.findUnique({
      where: {
        id: boardID,
        userID: req.user.id,
      },
      include: {
        columns: {
          orderBy: {
            createdAt: "asc",
          },
        },
      },
    });

    res.status(200).json({
      data: board,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve board.", error });
  }
};

/**
 * CREATE BOARD
 */
export const createBoard = async (req, res) => {
  const user = req.user;
  if (!user) res.json({ message: "No user found." });
  if (req.body.name === "") {
    res.json({ message: "Name cannot be empty." });
  }
  try {
    const board = await prisma.board.create({
      data: {
        name: req.body.name,
        userID: req.user.id,
        columns: {
          create: req.body.columns,
        },
      },
      include: {
        columns: true,
      },
    });

    res.status(201).json({
      data: {
        board,
      },
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to create board.", data: req.body, error });
  }
};

/**
 * UPDATE BOARD
 */
export const updateBoard = async (req, res) => {
  const { id: boardID } = req.params;

  const updateExistingColumns = req.body.columns.filter(
    (column) => column.id !== ""
  );
  const newColumns = req.body.columns.filter((column) => column.id === "");
  try {
    const board = await prisma.board.update({
      where: {
        id: boardID,
      },
      data: {
        name: req.body.name,
      },
      include: {
        columns: true,
      },
    });

    const updatedColumns = updateExistingColumns.map((column) => {
      prisma.columns.update({
        where: {
          id: column.id,
        },
        data: {
          name: column.name,
          color: column.color,
        },
      });
    });

    const createNewColumns = newColumns.map((column) => {
      prisma.columns.create({
        data: {
          boardID: board.id,
          name: column.name,
          color: column.color,
        },
      });
    });

    const deleteColumns = board.columns.map((column) => {
      const reqColumnsIDs = req.body.columns.map((col) => col.id);
      if (reqColumnsIDs.includes(column.id)) {
        return;
      }
      prisma.columns.delete({
        where: {
          id: column.id,
        },
      });
    });
    res.status(200).json({
      data: board,
      columns: { updatedColumns, createNewColumns, deleteColumns },
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to update board.", error });
  }
};

/**
 * DELETE BOARD
 */

export const deleteBoard = async (req, res) => {
  const { id: boardID } = req.params;
  try {
    await prisma.columns.deleteMany({
      where: {
        boardID,
      },
    });
    const board = await prisma.board.delete({
      where: {
        id: boardID,
      },
    });

    res.status(200).json({ data: board, message: "deleted" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete board." });
  }
};

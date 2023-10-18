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
          include: {
            columns: true,
          },
        },
      },
    });
    res.json({ data: user.boards });
  } catch (error) {
    res.status(401).json({ message: "Failed to retrieve boards." });
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
        columns: true,
      },
    });

    const sortBoardBasedOnColumns = board.columns.sort((a, b) => {
      const dateA: any = new Date(a.createdAt);
      const dateB: any = new Date(b.createdAt);
      return dateA - dateB;
    });
    res.json({
      data: sortBoardBasedOnColumns,
    });
  } catch (error) {
    res.status(401).json({ message: "Failed to retrieve board." });
  }
};

/**
 * CREATE BOARD
 */
export const createBoard = async (req, res) => {
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

    res.json({
      data: {
        board,
      },
    });
  } catch (error) {
    res.status(401).json({ message: "Failed to create board." });
  }
};

/**
 * UPDATE BOARD
 */
export const updateBoard = async (req, res) => {
  const { id: boardID } = req.params;
  const { columns } = req.body;

  // if the body contains a new column then create a new column
  columns
    .filter((column) => !column.id)
    .map(async (column) => {
      try {
        await prisma.columns.create({
          data: { ...column, boardID },
        });
      } catch (error) {
        res.status(401).json({ message: "Failed to create new column." });
      }
    });

  // if the body contains existing column then update it
  columns
    .filter((column) => column.id)
    .map(async (column) => {
      try {
        await prisma.columns.update({
          where: {
            id: column.id,
          },
          data: column,
        });
      } catch (error) {
        res.status(401).json({ message: "Failed to update columns." });
      }
    });

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

    res.json({ data: board });
  } catch (error) {
    res.status(401).json({ message: "Failed to update board." });
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

    res.json({ data: board, message: "deleted" });
  } catch (error) {
    res.status(401).json({ message: "Failed to delete board." });
  }
};
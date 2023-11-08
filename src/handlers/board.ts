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
        columns: {
          orderBy: {
            createdAt: "asc",
          },
        },
      },
    });

    res.json({
      data: board,
    });
  } catch (error) {
    res.status(401).json({ message: "Failed to retrieve board." });
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
      },
      include: {
        columns: {
          orderBy: {
            createdAt: "asc",
          },
        },
      },
    });

    res.json({
      data: {
        board,
      },
    });
  } catch (error) {
    res
      .status(401)
      .json({ message: "Failed to create board.", data: req.body, error });
  }
};

/**
 * UPDATE BOARD
 */
export const updateBoard = async (req, res) => {
  const { id: boardID } = req.params;
  try {
    const board = await prisma.board.update({
      where: {
        id: boardID,
      },
      data: {
        name: req.body.name,
      },
      include: {
        columns: {
          orderBy: {
            createdAt: "asc",
          },
        },
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

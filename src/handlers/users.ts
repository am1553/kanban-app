import prisma from "../db";
import { comparePasswords, createJWT, hashPassword } from "../modules/auth";

export const createUser = async (req, res) => {
  const { emailaddress, password } = req.body;

  try {
    const user = await prisma.user.create({
      data: {
        emailaddress,
        password: await hashPassword(password),
      },
    });
    const token = createJWT(user);
    res.json({ token, user });
  } catch (error) {
    res.status(401).json({ message: "Invalid input" });
  }
};

export const signin = async (req, res) => {
  const { emailaddress, password } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: {
        emailaddress,
      },
    });

    const isValidPassword = await comparePasswords(password, user.password);

    if (!isValidPassword) {
      res.status(401);
      res.json({ message: "Invalid password" });
      return;
    }

    const token = createJWT(user);
    res.json({ token, user });
  } catch (error) {
    res.status(401).json({ message: "Invalid input" });
  }
};

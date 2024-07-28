import { prisma } from "../config/prisma";
import { hashPassword, matchPassword } from "../lib/utils";
import { generateToken, verifyToken } from "../lib/utils";

export const createUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: await hashPassword(password), // it will be hashed
      },
    });
    const token = generateToken({
      id: user.id,
      email: user.email,
      name: user.name,
    });
    res.status(200).json({ message: "User created successfully", token });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: String(error) });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await matchPassword(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    if (user && isMatch) {
      const token = generateToken({
        id: user.id,
        email: user.email,
        name: user.name,
      });
      res.status(200).json({
        message: "Logged in successfully",
        token,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
        },
      });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

import { prisma } from "../config";

const createUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: password, // it will be hashed
      },
    });

    // sign user with jwt, return token
  } catch (error) {}
};

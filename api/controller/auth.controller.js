import bcrypt from "bcrypt";
import prisma from "../lib/prisma.js";

export const register = async (req, res) => {
  const { username, email, password } = req.body;

  console.log("registering user:", username, email, password);

  // HASH THE PASSWORD
  const hashedPassword = await bcrypt.hash(password, 10);

  // CREATE A NEW USER AND SAVE IT TO THE DATABASE
  const newUser = await prisma.user.create({
    data: {
      username,
      email,
      password: hashedPassword,
    },
  });

  console.log("new user created:", newUser);
  res.json(newUser);
};
export const login = async (req, res) => {};
export const logout = async (req, res) => {};

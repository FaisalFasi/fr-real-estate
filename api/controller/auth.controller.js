import bcrypt from "bcrypt";
import prisma from "../lib/prisma.js";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  const { username, email, password } = req.body;
  console.log(req.body);

  try {
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
    res.status(201).json({ message: "User created successfully", newUser });
  } catch (error) {
    console.log("error:", error);
    res
      .status(500)
      .json({ message: "An error occurred while creating the user" });
  }
};
export const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    //check if user exists
    const user = await prisma.user.findUnique({
      where: {
        username: username,
      },
    });

    // if the user is incorrect
    if (!user) {
      return res.status(401).json({ message: "Invalid Credentials" });
    }

    // check if the password is correct
    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    // if the password is incorrect
    if (!isPasswordCorrect) {
      return res.status(401).json({ message: "Invalid Credentials" });
    }

    // generate cookie token and send to user using cookie-parser
    // res
    //   .setHeader("Set-Cookie", "test=" + "myValue")
    //   .json({ message: "Logged in" });

    // cookie expiry time
    const age = 1000 * 60 * 60 * 24 * 7; // 1 week

    // generate jwt token and send to user
    const token = jwt.sign(
      { id: user.id, isAdmin: false },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: age,
      }
    );

    // send data to user (front end request will be able to access this data)
    const { password: userPassword, ...userData } = user;

    // set cookie options (secure, httpOnly, maxAge, sameSite)
    res
      .cookie("token", token, {
        httpOnly: true,
        // secure: true, // for https
        maxAge: age,
        sameSite: "none", // for cross-site requests
      })
      .status(200)
      .json(userData);
  } catch (error) {
    console.log("error:", error);
    res.status(500).json({ message: "Failed to Login!" });
  }
};
export const logout = async (req, res) => {
  res
    .clearCookie("token")
    .status(200)
    .json({ message: "Logged out successfull" });
};

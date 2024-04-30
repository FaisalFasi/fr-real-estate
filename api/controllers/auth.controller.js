import bcrypt from "bcryptjs";
import prisma from "../lib/prisma.js";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  const { username, email, password } = req.body;

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

    res.status(201).json({ message: "User created successfully", newUser });
  } catch (error) {
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
        username,
      },
    });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // generate cookie token and send to user using cookie-parser
    /* res
      .setHeader("Set-Cookie", "test=" + "myValue")
      .json({ message: "Logged in" });
    */

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
    jwt
      .verify(token, process.env.JWT_SECRET_KEY)
      .then((user) => console.log(user))
      .catch((err) => console.log(err.toString()));

    // Set cookie with JWT token >> secure, httpOnly, maxAge, sameSite;
    res.cookie("token", token, {
      httpOnly: true,
      // secure: true, // Ensure backend is served over HTTPS
      // domain: process.env.NODE_ENV,
      // sameSite: "None",
    });

    // send data to user (front end request will be able to access this data)
    const { password: userPassword, ...userInfo } = user;

    res.status(200).json(userInfo);
  } catch (error) {
    res.status(500).json({ message: "Failed to Login!" });
  }
};
export const logout = async (req, res) => {
  res
    .clearCookie("token")
    .status(200)
    .json({ message: "Logged out successfull" });
};

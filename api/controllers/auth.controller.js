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

    const token = jwt.sign(
      {
        id: user.id,
        isAdmin: false,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: age }
    );

    const { password: userPassword, ...userInfo } = user;

    // working cookie code
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Ensure HTTPS in production
      maxAge: age, // Cookie expiry time
      sameSite: "none", // for localhost use lax and for production use none SameSite attribute to prevent CSRF attacks
      path: "/", // Root path
    });

    res.status(200).json(userInfo);

    // here is the original code
    // res
    //   .cookie("token", token, {
    //     httpOnly: true,
    //     secure: process.env.NODE_ENV === "production", // Set secure only in production
    //     maxAge: age,
    //     sameSite: "lax",
    //   })
    //   .status(200)
    //   .json(userInfo);
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ message: "Failed to Login!" });
  }
};
export const logout = async (req, res) => {
  res
    .clearCookie("token")
    .status(200)
    .json({ message: "Logged out successfull" });
};

export const checkSession = async (req, res) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "No token found, please log in" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    // Fetch the user data from your database using decoded.id
    const user = await prisma.user.findUnique({
      where: {
        id: decoded.id,
      },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const { password, ...userInfo } = user; // Exclude password from the response

    res.status(200).json(userInfo);
  } catch (error) {
    console.error("Error validating token:", error);
    res
      .status(401)
      .json({ message: "Invalid or expired token, please log in again" });
  }
};

import bcrypt from "bcrypt";

export const register = async (req, res) => {
  const { username, email, password } = req.body;

  // HASH THE PASSWORD

  const hashedPassword = bcrypt.hash(password, 10);

  // CREATE A NEW USER
  // SAVE THE USER
  // SEND THE USER

  console.log(req.body);
  res.send("register");
  console.log("register");
};
export const login = async (req, res) => {};
export const logout = async (req, res) => {};

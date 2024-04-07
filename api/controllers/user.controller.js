import prisma from "../lib/prisma.js";

const getUsers = async (req, res) => {
  console.log("getUsers");
  try {
    const users = await prisma.user.findMany();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json(err);
  }
};

const getUser = async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
};

const updateUser = async (req, res) => {
  const id = req.params.id;
  const tokenUserId = req.userId;
  const body = req.body;

  if (id !== tokenUserId) {
    return res.status(403).json({ message: "Not Authorized" });
  }

  let updatedPassword = null;
  try {
    const updatedUser = await prisma.user.update({
      where: {
        id: id,
      },
      data: {
        ...body,
      },
    });
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json(err);
  }
};

const deleteUser = async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json("User has been deleted...");
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You can delete only your account!");
  }
};

export { getUsers, getUser, updateUser, deleteUser };

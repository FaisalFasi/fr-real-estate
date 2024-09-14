import prisma from "../lib/prisma.js";
import bcrypt from "bcryptjs";

const getUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.status(200).json(users);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

const getUser = async (req, res) => {
  const id = req.params.id;
  console.log("id", id);
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: id,
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
  // console.log(id, tokenUserId);
  const { password, avatar, ...inputs } = req.body;

  if (id !== tokenUserId) {
    return res.status(403).json({ message: "Not Authorized" });
  }

  let updatedPassword = null;
  try {
    if (password) {
      updatedPassword = await bcrypt.hash(password, 10);
    }
    const updatedUser = await prisma.user.update({
      where: {
        id: id,
      },
      data: {
        ...inputs,
        ...(updatedPassword && { password: updatedPassword }),
        ...(avatar && { avatar: avatar }),
      },
    });

    const { password: userPassword_, ...user_ } = updatedUser;

    res.status(200).json(user_);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to update users!" });
  }
};

const deleteUser = async (req, res) => {
  const id = req.params.id;
  const tokenUserId = req.userId;

  if (id !== tokenUserId) {
    return res.status(403).json({ message: "Not Authorized" });
  }
  try {
    await prisma.user.delete({
      where: {
        id: id,
      },
    });
    res.status(200).json("User has been deleted...");
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

const savePost = async (req, res) => {
  const { postId } = req.body;
  const tokenUserId = req.userId;

  try {
    const savedPost = await prisma.savedPost.findUnique({
      where: {
        userId_postId: {
          userId: tokenUserId,
          postId: postId,
        },
      },
    });

    if (savedPost) {
      await prisma.savedPost.delete({
        where: {
          id: savedPost.id,
        },
      });
      return res
        .status(200)
        .json({ message: "Post removed from the saved list" });
    } else {
      await prisma.savedPost.create({
        data: {
          userId: tokenUserId,
          postId: postId,
        },
      });
    }
    res.status(200).json({ message: "Post Saved" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error Saving post" });
  }
};

const savedPostsByUser = async (req, res) => {
  const tokenUserId = req.userId;

  try {
    const createdPosts = await prisma.post.findMany({
      where: {
        userId: tokenUserId,
      },
    });
    const saved = await prisma.savedPost.findMany({
      where: {
        userId: tokenUserId,
      },
      include: {
        post: true,
        user: {
          select: {
            username: true,
            avatar: true,
          },
        },
      },
    });

    const savedPosts = saved.map((item) => item.post);
    const postOwner = saved.length > 0 ? saved[0].user : null;

    // const postOwner = saved[0].user;

    res.status(200).json({ createdPosts: createdPosts, savedPosts, postOwner });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "failed to get profile posts!" });
  }
};

const getNotificationNumber = async (req, res) => {
  const tokenUserId = req.userId;

  try {
    let number = await prisma.chat.count({
      where: {
        userIDs: {
          hasSome: [tokenUserId],
        },
        NOT: {
          seenBy: {
            hasSome: [tokenUserId],
          },
        },
      },
    });

    res.status(200).json(number);
  } catch (err) {
    console.log("Failed to get notification number", err);
    res.status(500).json({ message: "Failed to get notification number" });
  } finally {
    await prisma.$disconnect();
  }
};

export {
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  savePost,
  savedPostsByUser,
  getNotificationNumber,
};

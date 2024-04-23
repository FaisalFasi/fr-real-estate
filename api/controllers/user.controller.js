import prisma from "../lib/prisma.js";
import bcrypt from "bcrypt";

const getUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json(err);
  }
};

const getUser = async (req, res) => {
  const id = req.params.id;

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
    res.status(500).json(err);
  }
};

const savePost = async (req, res) => {
  const { postId } = req.body;
  const tokenUserId = req.userId;

  console.log("post Id ", postId, tokenUserId);
  try {
    const savedPost = await prisma.savedPost.findUnique({
      where: {
        userId_postId: {
          userId: tokenUserId,
          postId: postId,
        },
      },
    });
    console.log("savedPost", savedPost);

    if (savedPost) {
      console.log("deleting");
      await prisma.savedPost.delete({
        where: {
          id: savedPost.id,
        },
      });
      return res
        .status(200)
        .json({ message: "Post removed from the saved list" });
    } else {
      console.log("creating");
      await prisma.savedPost.create({
        data: {
          userId: tokenUserId,
          postId: postId,
        },
      });
    }
    console.log(savePost);
    res.status(200).json({ message: "Post Saved" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error Saving post" });
  }
};

const profilePosts = async (req, res) => {
  const tokenUserId = req.userId;

  try {
    const allPosts = await prisma.post.findMany({
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
      },
    });
    console.log("saved", saved);

    const savedPosts = saved.map((item) => item.post);

    res.status(200).json({ allPosts, savedPosts });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "failed to get profile posts!" });
  }
};

export { getUsers, getUser, updateUser, deleteUser, savePost, profilePosts };

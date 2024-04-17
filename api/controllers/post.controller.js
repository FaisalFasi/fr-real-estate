import prisma from "../lib/prisma.js";

export const getPosts = async (req, res) => {
  const tokenUserId = req.userId;
  console.log(tokenUserId);

  try {
    const posts = await prisma.post.findMany();
    console.log(posts);
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving posts" });
  }
};

export const getPost = async (req, res) => {
  const id = req.params.id;

  try {
    const post = await prisma.post.findUnique({
      where: {
        id: id,
      },
    });
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: "Error creating post" });
  }
};

export const addPost = async (req, res) => {
  const { postData, postDetail } = req.body;

  const tokenUserId = req.userId;
  console.log(tokenUserId);

  try {
    const newPost = await prisma.post.create({
      data: {
        ...postData,
        // userId: tokenUserId,
        user: { connect: { id: tokenUserId } },
        postDetail: {
          create: postDetail,
        },
      },
    });
    console.log("New Post:", newPost);

    res.status(200).json(newPost);
  } catch (error) {
    console.log("Error Creating here ................");
    console.error("Error creating post:", error);
    res.status(500).json({ message: "Error creating post !!!" });
  }
};
export const updatePost = async (req, res) => {
  try {
  } catch (error) {
    res.status(500).json({ message: "Error creating post" });
  }
};
export const deletePost = async (req, res) => {
  const id = req.params.id;
  const tokenUserId = req.userId;
  try {
    const post = await prisma.post.findUnique({
      where: {
        id: id,
      },
    });
    if (post.userId !== tokenUserId) {
      return res.status(403).json({ message: "Not Authorized" });
    }
    await prisma.post.delete({
      where: {
        id: id,
      },
    });
    res.status(200).json({ message: "Post deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error creating post" });
  }
};

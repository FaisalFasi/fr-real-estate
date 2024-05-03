import prisma from "../lib/prisma.js";
import Jwt from "jsonwebtoken";

export const getPosts = async (req, res) => {
  const {
    city,
    type,
    property,
    minPrice,
    maxPrice,
    bedroom,
    latitude,
    longitude,
  } = req.query;

  const normalizedCity = city ? city.toString().toLowerCase() : undefined;

  try {
    const posts = await prisma.post.findMany({
      where: {
        city: normalizedCity,
        type: type === "any" ? { in: ["buy", "rent"] } : type || undefined,
        property: property || undefined,
        bedroom: parseInt(bedroom) || undefined,
        price: {
          gte: parseInt(minPrice) || 100,
          lte: parseInt(maxPrice) || 1000000,
        },
        latitude: latitude ? latitude.toString() : undefined,
        longitude: longitude ? longitude.toString() : undefined,
      },
    });

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
        id,
      },
      include: {
        postDetail: true,
        user: {
          select: {
            username: true,
            avatar: true,
          },
        },
      },
    });

    // we need to verify if the user is logged in or not while saving a post

    const token = req.cookies?.token;

    if (token) {
      Jwt.verify(token, process.env.JWT_SECRET, async (err, payload) => {
        if (!err) {
          const saved = await prisma.savedPost.findFirst({
            where: {
              userId_postId: {
                postId: id,
                userId: payload.id, // payload is the user id
              },
            },
          });

          res.status(200).json({ ...post, isSaved: saved ? true : false });
        }
      });
    }

    res.status(200).json({ ...post, isSaved: false });
  } catch (error) {
    res.status(500).json({ message: "Error creating post" });
  }
};

export const addPost = async (req, res) => {
  const body = req.body;

  const tokenUserId = req.userId;

  try {
    // const normalizedPostData = {
    //   ...body.postData,
    //   city: postData.city ? postData.city.toString().toLowerCase() : undefined,
    //   // Add other fields that need normalization here
    // };
    const newPost = await prisma.post.create({
      data: {
        ...body.postData, // This will overwrite the normalized fields
        userId: tokenUserId,
        postDetail: {
          create: body.postDetail,
        },
      },
    });

    res.status(200).json(newPost);
  } catch (error) {
    res.status(500).json({ message: "Error creating post !!!" });
    console.log(error);
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

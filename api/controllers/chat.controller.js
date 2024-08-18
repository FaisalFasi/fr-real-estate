import prisma from "../lib/prisma.js";

const getChats = async (req, res) => {
  const tokenUserId = req.userId;

  try {
    const chats = await prisma.chat.findMany({
      where: {
        userIDs: {
          hasSome: [tokenUserId],
        },
      },
    });

    for (const chat of chats) {
      const receiverId = chat.userIDs.find((id) => id != tokenUserId);
      const receiver = await prisma.user.findUnique({
        where: {
          id: receiverId,
        },
        select: {
          id: true,
          username: true,
          avatar: true,
        },
      });
      chat.receiver = receiver;
    }
    res.status(200).json(chats);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to get chats!" });
  }
};

const getChat = async (req, res) => {
  const tokenUserId = req.userId;

  console.log("Request Params: ", req.params.id);
  console.log("Token User ID: ", tokenUserId);

  try {
    const chat = await prisma.chat.findFirst({
      where: {
        id: req.params.id,
        userIDs: {
          hasSome: [tokenUserId],
        },
      },
      include: {
        messages: {
          orderBy: {
            createdAt: "asc",
          },
        },
      },
    });

    if (chat) {
      await prisma.chat.update({
        where: {
          id: req.params.id,
        },
        data: {
          seenBy: { push: [tokenUserId] },
        },
      });
    }
    console.log("Chat: ", chat);

    res.status(200).json(chat);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to get chat!" });
  }
};
const addChat = async (req, res) => {
  const tokentUserId = req.userId;

  console.log("Request Body: ", req.body);
  console.log("tokentUserId: ", tokentUserId);
  try {
    const newChat = await prisma.chat.create({
      data: {
        userIDs: [tokentUserId, req.body.receiverId],
      },
    });
    console.log("New chat: ", newChat);

    res.status(200).json(newChat);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to add chat!" });
  }
};
const readChat = async (req, res) => {
  const tokenUserId = req.userId;

  try {
    const chat = await prisma.chat.update({
      where: {
        id: req.params.id,
        userIDs: {
          hasSome: [tokenUserId],
        },
      },
      data: {
        seenBy: { set: [tokenUserId] },
      },
    });
    res.status(200).json(chat);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to read chat!" });
  }
};

const getChatMessages = async (req, res) => {
  const tokenUserId = req.userId;
  const receiverId = req.params.id;

  try {
    // Check if a chat already exists between the two users
    let chat = await prisma.chat.findFirst({
      where: {
        userIDs: {
          hasEvery: [tokenUserId, receiverId],
        },
      },
    });

    console.log("Is Chat exists:", chat);

    if (!chat) {
      console.log("Chat does not exists:", chat);
    }
    // Add the message to the chat
    const getAllMessages = await prisma.message.findMany({
      where: {
        chatId: chat.id,
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    console.log("All Messages:", getAllMessages);

    console.log("Chat ID: ", chat.id);
    res.status(200).json({ messages: getAllMessages, chatId: chat.id });
  } catch (err) {
    console.log("Error fetching chat:", err);
    res.status(500).json({ message: "Failed to get chat!" });
  }
};

const addChatAndMessage = async (req, res) => {
  const { receiverId, text } = req.body;
  const tokenUserId = req.userId;

  console.log("Received addChatAndMessage request:", {
    tokenUserId,
    receiverId,
    text,
  });

  try {
    // Validate the input
    if (!text || !receiverId) {
      return res
        .status(400)
        .json({ error: "Text and receiverId cannot be empty!" });
    }

    // Check if a chat already exists between the two users
    let chat = await prisma.chat.findUnique({
      where: {
        userIDs: {
          hasEvery: [tokenUserId, receiverId],
        },
      },
    });
    console.log("Is Chat exists:", chat);

    // If no chat exists, create a new one
    if (!chat) {
      console.log("Chat does not exists:", chat);

      chat = await prisma.chat.create({
        data: {
          userIDs: [tokenUserId, receiverId],
        },
      });
      console.log("created a new Chat:", chat);
    }

    // Add the message to the chat
    const message = await prisma.message.create({
      data: {
        text,
        chatId: chat.id,
        userId: tokenUserId,
      },
    });

    // Update the chat with the last message and seenBy status
    const updatedChat = await prisma.chat.update({
      where: {
        id: chat.id,
      },
      data: {
        seenBy: {
          set: [tokenUserId],
        },
        lastMessage: text,
      },
    });

    console.log("Chat ID", chat.id);
    console.log("Message", message);
    // Return the chat ID and the newly added message
    res
      .status(200)
      .json({ chatId: updatedChat.id, message, chat: updatedChat });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to add chat and message!" });
  }
};

export {
  getChats,
  getChat,
  addChat,
  readChat,
  getChatMessages,
  addChatAndMessage,
};

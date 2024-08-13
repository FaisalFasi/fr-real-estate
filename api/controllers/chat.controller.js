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
    const chat = await prisma.chat.findUnique({
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

const addChatAndMessage = async (req, res) => {
  const { receiverId } = req.body;

  const tokenUserId = req.userId;
  // const chatId = req.params.chatId;
  const text = req.body.text;

  console.log("Received addChatAndMessage request:", {
    // chatId,
    tokenUserId,
    receiverId,
    text,
  });

  try {
    // Validate the input
    if (!text) {
      return res.status(400).json({ error: "Text cannot be empty!" });
    }

    // Check if a chat already exists between the two users
    let chat = await prisma.chat.findFirst({
      where: {
        userIDs: {
          hasEvery: [tokenUserId, receiverId],
        },
      },
    });
    console.log("Chat", chat);

    // If no chat exists, create a new one
    if (!chat) {
      chat = await prisma.chat.create({
        data: {
          userIDs: [tokenUserId, receiverId],
        },
      });
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
    await prisma.chat.update({
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
    res.status(200).json({ chatId: chat.id, message });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to add chat and message!" });
  }
};

export { getChats, getChat, addChat, readChat, addChatAndMessage };

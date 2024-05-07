import prisma from "./prisma.js";

const initializeDatabase = async () => {
  try {
    // Check if chat table exists
    const existingChat = await prisma.chat.findFirst();
    if (!existingChat) {
      // Create an empty chat record if it doesn't exist
      const createdChat = await prisma.chat.create({
        data: {
          // Define any default properties for the chat table here
        },
      });
      console.log("Chat table created successfully.");

      // Now create a message associated with this chat
      await createMessage(createdChat.id); // Create message for the created chat
    } else {
      console.log("Chat table already exists.");

      // Check if there are existing messages in this chat
      const existingMessages = await prisma.message.findMany({
        where: { chatId: existingChat.id },
      });

      if (existingMessages.length === 0) {
        // Find the first user in the User table
        const user = await prisma.user.findFirst();

        if (user) {
          // Create a new message associated with this chat and user
          await createMessage(existingChat.id, user.id); // Create message for existing chat and user
        } else {
          console.log("No user found in the User table.");
        }
      } else {
        console.log("Message table already exists for this chat.");
      }
    }
  } catch (error) {
    console.error("Error initializing database:", error);
  } finally {
    await prisma.$disconnect();
  }
};

// Function to create a message associated with a chat and user
const createMessage = async (chatId, userId) => {
  try {
    // Check if userId is provided
    if (!userId) {
      throw new Error("userId is missing when creating message.");
    }

    // Create the message
    await prisma.message.create({
      data: {
        text: "Default message text", // Provide a default text value
        userId: userId, // Use the retrieved user's id
        chat: { connect: { id: chatId } }, // Connect the message to the chat
      },
    });
    console.log("Message created successfully.");
  } catch (error) {
    console.error("Error creating message:", error);
  }
};

// Call initializeDatabase function when this file is executed
// initializeDatabase().catch((error) => {
//   console.error("Database initialization error:", error);
// });

export default initializeDatabase;

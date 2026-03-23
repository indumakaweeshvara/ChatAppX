const prisma = require('../services/prisma');

const chatController = {
  getMessages: async (req, res) => {
    try {
      const { roomId } = req.params;
      const messages = await prisma.message.findMany({
        where: { roomId },
        orderBy: { createdAt: 'asc' },
        include: { sender: true }
      });
      res.json(messages);
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve messages' });
    }
  },

  saveMessage: async (data) => {
    try {
      return await prisma.message.create({
        data: {
          content: data.text,
          senderId: data.senderId,
          roomId: data.roomId
        }
      });
    } catch (error) {
      console.error('Error saving message:', error);
    }
  }
};

module.exports = chatController;

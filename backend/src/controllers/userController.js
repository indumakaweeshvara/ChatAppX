const prisma = require('../services/prisma');

const userController = {
  updateXP: async (userId, xpGain) => {
    try {
      const user = await prisma.user.findUnique({ where: { id: userId } });
      if (!user) return;

      const now = new Date();
      const lastMessageDate = user.lastMessageAt ? new Date(user.lastMessageAt) : null;
      
      let newStreak = user.streak || 0;
      if (!lastMessageDate) {
        newStreak = 1;
      } else {
        const diffHours = (now - lastMessageDate) / (1000 * 60 * 60);
        if (diffHours < 24 && diffHours > 0) {
          // Same day or within 24h, keep streak or potentially don't increment yet
        } else if (diffHours >= 24 && diffHours < 48) {
          newStreak += 1; // New consecutive day
        } else if (diffHours >= 48) {
          newStreak = 1; // Streak broken
        }
      }

      const newXP = user.xp + xpGain;
      const newLevel = Math.floor(newXP / 100) + 1;
      const rank = newLevel > 50 ? 'GALACTIC OVERLORD' : newLevel > 20 ? 'ELITE' : 'NOVICE';

      return await prisma.user.update({
        where: { id: userId },
        data: {
          xp: newXP,
          level: newLevel,
          streak: newStreak,
          lastMessageAt: now,
          rank: rank
        }
      });
    } catch (error) {
      console.error('Error updating XP:', error);
    }
  },

  getUserData: async (req, res) => {
    try {
      const { userId } = req.params;
      const user = await prisma.user.findUnique({ where: { id: userId } });
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve user data' });
    }
  }
};

module.exports = userController;

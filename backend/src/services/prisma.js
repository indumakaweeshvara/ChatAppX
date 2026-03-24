// MOCKED PRISMA CLIENT
const prisma = {
  user: {
    findUnique: async () => ({ id: 'user-1', username: 'Nova Explorer', xp: 1540, level: 42, streak: 14, rank: 'ELITE' }),
    update: async (data) => data.data
  },
  message: {
    findMany: async () => [],
    create: async (data) => data.data
  }
};
module.exports = prisma;

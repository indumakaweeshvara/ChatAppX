const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, '../../data.json');

const defaultData = {
  users: [
    { id: 'user-1', phone: '+94771234567', username: 'G-Explorer', xp: 1540, level: 42, rank: 'Moon Pioneer', streak: 5, lastMessageAt: new Date().toISOString() }
  ],
  messages: [
    { id: '1', roomId: 'Mars-Colony-Alpha', senderId: 'user-2', text: 'Approaching the event horizon. Gravity seems to be... missing?', type: 'received', timestamp: '09:30 AM', createdAt: new Date().toISOString() }
  ]
};

const dataStore = {
  read: () => {
    if (!fs.existsSync(DATA_FILE)) {
      fs.writeFileSync(DATA_FILE, JSON.stringify(defaultData, null, 2));
      return defaultData;
    }
    const content = fs.readFileSync(DATA_FILE, 'utf-8');
    return JSON.parse(content);
  },

  write: (data) => {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
  },

  getMessages: (roomId) => {
    const data = dataStore.read();
    return data.messages.filter(m => m.roomId === roomId);
  },

  saveMessage: (msgData) => {
    const data = dataStore.read();
    const newMessage = {
      id: Date.now().toString(),
      ...msgData,
      createdAt: new Date().toISOString()
    };
    data.messages.push(newMessage);
    dataStore.write(data);
    return newMessage;
  },

  getUser: (userId) => {
    const data = dataStore.read();
    return data.users.find(u => u.id === userId) || data.users[0];
  },

  updateUser: (userId, updateData) => {
    const data = dataStore.read();
    const index = data.users.findIndex(u => u.id === userId);
    if (index !== -1) {
      data.users[index] = { ...data.users[index], ...updateData };
    } else {
      data.users.push({ id: userId, ...updateData });
    }
    dataStore.write(data);
    return data.users[index !== -1 ? index : data.users.length - 1];
  }
};

module.exports = dataStore;

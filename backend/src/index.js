const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

const apiRoutes = require('./routes/api');
const chatController = require('./controllers/chatController');
const userController = require('./controllers/userController');

app.use(cors());
app.use(express.json());
app.use('/api', apiRoutes);

app.get('/', (req, res) => {
    res.send('Galactic Chat Backend is operational.');
});

io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    socket.on('join_room', (roomId) => {
        socket.join(roomId);
        console.log(`User ${socket.id} joined room ${roomId}`);
    });

    socket.on('send_message', async (data) => {
        await chatController.saveMessage(data);
        if (data.senderId) {
            await userController.updateXP(data.senderId, 10);
        }
        socket.to(data.roomId).emit('receive_message', data);
        console.log('Message relay & XP update:', data);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });
});

const PORT = process.env.PORT || 5000;
if (process.env.NODE_ENV !== 'production') {
    server.listen(PORT, () => {
        console.log(`Galactic Server running on port ${PORT}`);
    });
}

module.exports = app;

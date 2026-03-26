const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');
const userController = require('../controllers/userController');

const aiController = require('../controllers/aiController');
const authController = require('../controllers/authController');

// Auth routes
router.post('/auth/send-otp', authController.sendOTP);
router.post('/auth/verify-otp', authController.verifyOTP);

// Chat routes
router.get('/messages/:roomId', chatController.getMessages);

// AI routes
router.post('/ai/analyze', async (req, res) => {
  const result = await aiController.analyzeMood(req.body.text);
  res.json(result);
});

// User/Gamification routes
router.get('/user/search', userController.searchUser);
router.get('/user/:userId', userController.getUserData);

module.exports = router;

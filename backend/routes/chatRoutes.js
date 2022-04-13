const express = require('express');
const router = express.Router();
const {accessChat,updateChat} = require('../controllers/chatController.js');
const { protect } = require('../middlewares/authMiddleware');
router.route('/').post(accessChat);
router.route('/update').put(updateChat)
// router.route('/create').post(protect, createChat);
module.exports=router;
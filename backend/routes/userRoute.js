// routes/helpers.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const userController = require('../controllers/userController');

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/login', upload.none(), userController.loginUser);
router.post('/signup', upload.single('userImage'), userController.createUser);
router.get('/getUserInfo/:userId', userController.getUserInfo);


module.exports = router;

// routes/helpers.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const orderController = require('../controllers/orderController');

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/postOrder', upload.none(), orderController.createOrder);
router.get('/getOrders/:userId', orderController.getOrdersByUserId);
router.delete('/delete/:orderId', orderController.deleteOrderById);

router.post('/postNotification', orderController.createNotification);
router.get('/getNotifications/:userId', orderController.getNotifications);
router.delete('/deleteNotification/:notificationId', orderController.deleteNotification);

module.exports = router;

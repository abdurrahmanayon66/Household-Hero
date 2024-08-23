const { Order, Helper, Notification} = require('../models'); // Adjust the path as needed

exports.createOrder = async (req, res) => {
  const { helperId, userId, date, time, frequency, selectedDays } = req.body;

  console.log(frequency,date,time);

  // Check for missing required fields
  if (!helperId || !userId || !date || !time || !frequency) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    // Fetch the helper details
    const helper = await Helper.findOne({
      where: { helperId: helperId },
      attributes: ['feePerDay', 'feePerMonth']
    });

    if (!helper) {
      return res.status(404).json({ error: 'Helper not found' });
    }

    let bill;
    if (frequency === "monthly basis") {
      bill = helper.feePerMonth;
      contractType = 'Monthly basis';
    } else {
      bill = helper.feePerDay;
       contractType = 'One time only';
    }

    // Create the new order
    const newOrder = await Order.create({
      helperId,
      userId,
      contractType,
      date,
      time,
      bill,
      frequency,
      status: 'pending',
      workingDays: selectedDays || null
    });

    res.status(200).json({ message: 'Order created successfully', order: newOrder });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server Error' });
  }
};


exports.getOrdersByUserId = async (req, res) => {
  try {
    const userId = req.params.userId;

    const orders = await Order.findAll({
      include: {
        model: Helper,
        as: 'Helper', // Ensure this matches the alias used in the association
        attributes: ['name', 'helperImage', 'serviceTitle'], // Select specific fields
        required: true,
      },
      where: {
        userId: userId,
      },
      order: [['orderId', 'ASC']],
    });

    const ordersWithBase64Images = orders.map(order => {
      const helper = order.Helper;
      if (helper && helper.helperImage) {
        helper.helperImage = Buffer.from(helper.helperImage).toString('base64');
      }
      return order;
    });

    res.status(200).json(ordersWithBase64Images);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.deleteOrderById = async(req,res) => {

  const { orderId } = req.params;

  try {
    const order = await Order.findOne({ where: { orderId: orderId } });

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    await order.destroy();

    res.status(200).json({ message: 'Order deleted successfully' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while deleting the order' });
  }
};

exports.createNotification = async (req, res) => {
  const { orderId, notificationType } = req.body;

  // Check for missing required fields
  if (!orderId || !notificationType) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    // Find the order based on the orderId
    const order = await Order.findOne({ where: { orderId: orderId } });

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    // Create a notification with the necessary information
    const notification = await Notification.create({
      helperId: order.helperId,
      userId: order.userId,
      orderId: order.orderId,
      notificationType,
      seen: false
    });

    res.status(200).json({ message: 'Notification created successfully', notification });
  } catch (error) {
    console.error('Error creating notification:', error.message);
    res.status(500).json({ error: 'An error occurred while creating the notification' });
  }
};


exports.getNotifications = async (req, res) => {
  const { userId } = req.params; // Assuming you are passing the userId as a URL parameter

  try {
    // Find notifications for the user
    const notifications = await Notification.findAll({
      where: { userId: userId },
      include: [
        {
          model: Helper,
          as: 'Helper',
          attributes: ['name', 'helperImage', 'serviceTitle']
        }
      ],
      attributes: ['notificationId', 'helperId', 'userId', 'orderId', 'notificationType', 'seen', 'createdAt', 'updatedAt']
    });

    if (!notifications.length) {
      return res.status(404).json({ error: 'No notifications found for the user' });
    }

    // Convert images to base64
    const notificationsWithBase64Images = await Promise.all(
      notifications.map(async (notification) => {
        const helperImage = notification.Helper.helperImage;
        const base64Image = helperImage ? helperImage.toString('base64') : null;

        return {
          ...notification.toJSON(),
          Helper: {
            ...notification.Helper.toJSON(),
            helperImage: base64Image,
          },
        };
      })
    );

    res.status(200).json({ notifications: notificationsWithBase64Images });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching notifications' });
  }
};

exports.deleteNotification = async(req,res) => {
  const {notificationId}=req.params;
  try{
    const notification=await Notification.findOne({where:{notificationId:notificationId}});
    if(!notification){
      return res.status(404).json({error:'Notification not found'});
      }
      await notification.destroy();
      res.status(200).json({message:'Notification deleted successfully'});
      }catch(error){
        console.error(error);
        res.status(500).json({error:'An error occurred while deleting notification'});
        }
};
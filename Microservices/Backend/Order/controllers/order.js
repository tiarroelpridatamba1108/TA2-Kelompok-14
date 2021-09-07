const Order = require('../models/order');
const axios = require('axios').default;

exports.getOrdersByUserId = (req, res, next) => {
  const { userId } = req.body;

  Order.find({ userId: userId })
    .then((orders) => res.json(orders))
    .catch((err) => {
      res.json('Error occurred');
      return console.error(err);
    });
};

exports.getUserOrderById = (req, res, next) => {
  const { userId } = req.body;
  const orderId = req.params.id;

  Order.findOne({ userId: userId, _id: orderId })
    .then((order) => res.json(order))
    .catch((err) => {
      res.json('Error occurred');
      return console.error(err);
    });
};

exports.postOrder = (req, res, next) => {
  const {
    userId,
    receiverName,
    phoneNumber,
    address,
    postalCode,
    paymentMethod,
  } = req.body;

  axios
    .post('http://localhost:8083/', {
      userId: userId,
    })
    .then(async (cart) => {
      const newOrder = new Order({
        products: cart.data,
        userId,
        receiverName,
        phoneNumber,
        address,
        postalCode,
        paymentMethod,
      });

      await newOrder.save();

      await axios.post('http://localhost:8083/clean', {
        userId: userId,
      });

      await axios.post('http://localhost:8082/', {
        orderId: order._id,
      });

      return res.json({ message: 'Order created successfully' });
    })
    .catch((err) => {
      res.json(err);
      return console.error(err);
    });
};

exports.deleteOrder = (req, res, next) => {
  const { userId } = req.body;
  const orderId = req.params.id;

  Order.findOneAndDelete({ userId: userId, _id: orderId })
    .then((result) => {
      if (!result) {
        return res.json({ message: 'Order not found!' });
      }

      return res.json({ message: 'Order deleted successfully' });
    })
    .catch((err) => {
      res.json('Error occurred');
      return console.error(err);
    });
};

exports.postPayment = (req, res, next) => {
  const userId = req.body.userId;
  const orderId = req.body.orderId;
  const imageUrl = req.body.imageUrl;

  Order.findOne({ _id: orderId, userId: userId })
    .then(async (order) => {
      if (!order) {
        return res.json('Order not found!');
      }

      order.paymentStatus = 'W';
      order.paymentCheck = imageUrl;

      const result = await order.save();
      if (!result) {
        return res.json('Payment failed!');
      }

      await axios.post('http://localhost:8082/payment', {
        orderId: orderId,
      });

      res.json('Payment successful');
    })
    .catch((err) => {
      res.json('Error occurred');
      return console.error(err);
    });
};

exports.postCancelOrder = (req, res, next) => {
  const userId = req.body.userId;
  const orderId = req.body.orderId;

  Order.findOne({ _id: orderId, userId: userId })
    .then(async (order) => {
      if (!order) {
        return res.json('Order not found!');
      }

      order.paymentStatus = 'C';
      order.paymentCheck = null;

      const result = await order.save();
      if (!result) {
        return res.json('Order cancellation success!');
      }

      await axios.post('http://localhost:8082/cancel', {
        orderId: orderId,
      });

      res.json('Order cancellation failed!');
    })
    .catch((err) => {
      res.json('Error occurred');
      return console.error(err);
    });
};

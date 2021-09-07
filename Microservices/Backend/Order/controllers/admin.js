const Order = require('../models/order');
const axios = require('axios');

exports.postAcceptPayment = (req, res, next) => {
  const orderId = req.body.orderId;

  Order.findById(orderId)
    .then(async (order) => {
      if (!order) {
        return res.json('Order not found!');
      }

      order.paymentStatus = 'A';
      order.paymentDate = Date.now();

      const result = await order.save();
      if (!result) {
        return res.json('Accept payment failed!');
      }

      await axios.post('http://localhost:8082/accept', {
        orderId: orderId,
      });

      res.json('Accept payment successful');
    })
    .catch((err) => {
      res.json('Error occurred');
      return console.error(err);
    });
};

exports.postRejectPayment = (req, res, next) => {
  const orderId = req.body.orderId;

  Order.findById(orderId)
    .then(async (order) => {
      if (!order) {
        return res.json('Order not found!');
      }

      order.paymentStatus = 'R';
      order.paymentCheck = null;

      const result = await order.save();
      if (!result) {
        return res.json('Reject payment failed!');
      }

      await axios.post('http://localhost:8082/reject', {
        orderId: orderId,
      });

      res.json('Reject payment successful');
    })
    .catch((err) => {
      res.json('Error occurred');
      return console.error(err);
    });
};

exports.getOrders = (req, res, next) => {
  Order.find()
    .then((orders) => {
      return res.json(orders);
    })
    .catch((err) => {
      res.json('Error occurred');
      return console.error(err);
    });
};

exports.getOrderById = (req, res, next) => {
  const orderId = req.params.id;

  Order.findById(orderId)
    .then((order) => res.json(order))
    .catch((err) => {
      res.json('Error occurred');
      return console.error(err);
    });
};

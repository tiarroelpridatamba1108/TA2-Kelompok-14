const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const orderSchema = new Schema({
  products: [
    {
      product: { type: Object, required: true },
      quantity: { type: Number, required: true },
    },
  ],
  userId: {
    type: String,
    required: true,
  },
  receiverName: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: Number,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  postalCode: {
    type: String,
    required: true,
  },
  orderDate: {
    type: Date,
    default: Date.now(),
  },
  paymentDate: {
    type: Date,
    default: null,
  },
  paymentMethod: {
    type: String,
    enum: ['cod', 'tf'],
    required: true,
  },
  paymentStatus: {
    type: String,
    enum: ['P', 'W', 'R', 'A', 'C'],
    default: 'P',
  },
  paymentCheck: {
    type: String,
    default: '',
  },
});

module.exports = mongoose.model('Order', orderSchema);

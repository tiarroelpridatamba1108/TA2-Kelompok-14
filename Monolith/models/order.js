const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const orderSchema = new Schema({
  products: [
    {
      productId: {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
    },
  ],
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  orderDate: {
    type: Date,
    default: Date.now(),
  },
  paymentDate: {
    type: Date,
    default: "",
  },
  address: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["0", "1", "-1", "P"],
    default: "P",
  },
});

module.exports = mongoose.model("Order", orderSchema);

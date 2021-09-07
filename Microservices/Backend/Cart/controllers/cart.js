const { default: axios } = require('axios');
const Cart = require('../models/cart');

exports.deleteCart = (req, res, next) => {
  const { userId } = req.params;

  Cart.findOneAndDelete({ userId })
    .then((result) => {
      if (!result) {
        return res.json('Cart Not Deleted!');
      }

      return res.json('Cart Deleted Successfully');
    })
    .catch((err) => {
      res.json('Error occurred');
      console.error(err);
    });
};

exports.cleanCartItems = async (req, res, next) => {
  const { userId } = req.body;

  try {
    const cart = await Cart.findOne({ userId: userId });
    cart.items = [];

    cart
      .save()
      .then(() => res.json('Cart cleaned successfully'))
      .catch((err) => res.json(err));
  } catch (err) {
    res.json(err);
  }
};

exports.addCart = (req, res, next) => {
  const { userId } = req.body;

  const cart = new Cart({
    items: [],
    userId: userId,
  });

  cart
    .save()
    .then((result) => res.json(result))
    .catch((err) => {
      res.json('Error occurred');
      console.error(err);
    });
};

exports.getCart = async (req, res, next) => {
  const { userId } = req.body;
  let products = [];

  try {
    const cart = await Cart.findOne({ userId: userId });

    for (i = 0; i < cart.items.length; i++) {
      const result = await axios.get(
        `http://localhost:8085/${cart.items[i].productId}`,
      );

      products.push({
        product: { ...result.data },
        quantity: cart.items[i].quantity,
      });
    }
  } catch (err) {
    res.json('Error occurred');
    return console.error(err);
  }

  return res.json(products);
};

exports.removeItem = (req, res, next) => {
  const { userId } = req.body;
  const productId = req.params.id;

  Cart.findOne({ userId })
    .then((cart) => {
      cart.items = cart.items.filter((item) => {
        return item.productId.toString() !== productId;
      });
      cart.save();
      return res.json({ message: 'Cart Remove Item Success!' });
    })
    .catch((err) => {
      res.json('Error occurred');
      return console.error(err);
    });
};

exports.updateItem = (req, res, next) => {
  const { userId, productId, quantity } = req.body;

  Cart.findOne({ userId })
    .then((cart) => {
      const cartProductIndex = cart.items.findIndex((cp) => {
        return cp.productId.toString() === productId.toString();
      });
      const updatedCartItems = [...cart.items];

      if (cartProductIndex >= 0) {
        updatedCartItems[cartProductIndex].quantity = quantity;
      } else {
        updatedCartItems.push({
          productId: productId,
          quantity: quantity,
        });
      }

      cart.items = updatedCartItems;
      return cart.save();
    })
    .then((result) => {
      if (!result) {
        return res.json({ message: 'Cart Update Item failed!' });
      }

      return res.json({ message: 'Cart Update Item Success!' });
    })
    .catch((err) => {
      res.json('Error occurred');
      return console.error(err);
    });
};

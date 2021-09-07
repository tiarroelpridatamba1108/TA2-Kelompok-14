const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const axios = require('axios');

const jwt_secret = process.env.JWT_SECRET;

exports.getUsers = (req, res, next) => {
  User.find()
    .then((users) => res.json(users))
    .catch((err) => {
      res.json('Error occurred');
      return console.error(err);
    });
};

exports.getUserById = (req, res, next) => {
  const userId = req.params.id;

  User.findById(userId)
    .then((user) => res.json(user))
    .catch((err) => {
      res.json('Error occurred');
      return console.error(err);
    });
};

exports.getUserByAdmin = (req, res, next) => {
  User.find({ role: 'A' })
    .then((users) => res.json(users))
    .catch((err) => {
      res.json('Error occurred');
      return console.error(err);
    });
};

exports.getUserByCustomer = (req, res, next) => {
  User.find({ role: 'C' })
    .then((users) => res.json(users))
    .catch((err) => {
      res.json('Error occurred');
      return console.error(err);
    });
};

exports.postSignupAsAdmin = async (req, res, next) => {
  const { email, name, gender, phoneNumber, password } = req.body;
  const role = 'A';

  try {
    let user = await User.findOne({ email: email });

    if (user) {
      return res.json({ message: 'E-mail is not available' });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = new User({
      email: email,
      name: name,
      password: hashedPassword,
      phoneNumber: phoneNumber,
      gender: gender,
      role: role,
    });

    user = newUser.save();

    let result = await axios.post('http://localhost:8083/add', {
      userId: user._id,
    });

    if (!result) {
      throw new Error('Registration failed');
    }

    result = await axios.post('http://localhost:8082/register', {
      name: name,
      email: email,
    });

    if (!result) {
      throw new Error('Registration failed');
    }

    const data = {
      _id: user._id,
      name: user.name,
      role: user.role,
    };

    const token = jwt.sign(data, jwt_secret);

    return res.json({ jwt: token });
  } catch (err) {
    res.json('Error occurred');
    return console.error(err);
  }
};

exports.deleteUser = (req, res, next) => {
  const userId = req.params.id;

  User.findByIdAndDelete(userId)
    .then(async (result) => {
      if (!result) {
        return res.json('User Not Deleted!');
      }

      await axios.delete(`http://localhost:8083/${userId}`);

      return res.json('User Deleted Successfully');
    })
    .catch((err) => {
      res.json('Error occurred');
      return console.error(err);
    });
};

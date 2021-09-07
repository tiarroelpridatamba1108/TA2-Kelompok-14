const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const axios = require('axios');

const jwt_secret = process.env.JWT_SECRET;

exports.authToken = (req, res, next) => {
  const token = req.header.Authorization;

  const data = jwt.decode(token, jwt_secret);

  User.findById(data._id).then((user) => {
    if (!user) {
      return res.json({ message: 'Invalid token' });
    }

    return res.json({ user });
  });
};

exports.postLogin = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email: email })
    .then(async (user) => {
      if (!user) {
        return res.json({ message: 'Invalid email or password' });
      }

      const doMatch = await bcrypt.compare(password, user.password);
      if (!doMatch) {
        return res.json({ message: 'Invalid email or password' });
      }

      const data = {
        _id: user._id,
        name: user.name,
        role: user.role,
      };

      const token = jwt.sign(data, jwt_secret);

      return res.json({ jwt: token });
    })
    .catch((err) => {
      res.json('Error occurred');
      return console.error(err);
    });
};

exports.postSignup = async (req, res, next) => {
  const { email, name, gender, phoneNumber, password } = req.body;
  const role = 'C';

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

    user = await newUser.save();

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

exports.updatePassword = (req, res, next) => {
  const { _id, password } = req.body;

  User.findById(_id)
    .then(async (user) => {
      if (!user) {
        return res.json({ message: 'User not found!' });
      }

      const hashedPassword = await bcrypt.hash(password, 12);
      user.password = hashedPassword;

      await user.save();
      return res.json({ message: 'Password updated successfully!' });
    })
    .catch((err) => {
      res.json('Error occurred');
      return console.error(err);
    });
};

exports.updateUser = (req, res, next) => {
  const { userId, email, name, phoneNumber } = req.body;

  User.findById(userId)
    .then(async (user) => {
      if (!user) {
        return res.json({ message: 'User not found!' });
      }

      user.email = email;
      user.name = name;
      user.phoneNumber = phoneNumber;

      await user.save();
      return res.json({ message: 'User updated successfully!' });
    })
    .catch((err) => {
      res.json('Error occurred');
      return console.error(err);
    });
};

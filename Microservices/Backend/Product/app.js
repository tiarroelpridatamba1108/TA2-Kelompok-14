if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const MONGODB_URI = process.env.MONGODB_URI;
const PORT = process.env.PORT;

const app = express();

app.use(cors());

const productRoutes = require('./routes/product');
const adminRoutes = require('./routes/admin');

app.use(express.json());

app.use(productRoutes);
app.use('/admin', adminRoutes);

mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    console.log('Database Connected');
    app.listen(PORT);
    console.log(`Product service: ${PORT}`);
  })
  .catch((err) => console.log(err));

require('dotenv').config();

const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// CONNECT TO MONGODB SERVER
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true })
  // .then(() => console.log('Successfully connected to mongodb'))
  .then(() => null)
  .catch(e => console.error(e));
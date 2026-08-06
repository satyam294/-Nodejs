const mongoose = require("mongoose");

function connectMongoDb (url) {
  return mongoose.connect(url)
    .then(() => {
      console.log('Database connected...');
    })
}

module.exports = connectMongoDb;

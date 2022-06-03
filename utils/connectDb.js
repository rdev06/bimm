const mongoose = require('mongoose');
const {MONGO_URL, mongodbOptions} = require('../config');
const db = mongoose.connection;
if(!db.readyState){
  mongoose.connect(MONGO_URL, mongodbOptions);
}

module.exports = new Promise((resolve, reject) => {
  //for successful connection
  db.once('open', () => resolve(db));
  //for error in connection
  db.on('error', reject);
});

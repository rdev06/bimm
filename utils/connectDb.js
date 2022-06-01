const mongoose = require('mongoose');
const config = require('../config');
const db = mongoose.connection;
if(!db.readyState){
  mongoose.connect(process.env.MONGO_URL, config.mongodbOptions);
}

module.exports = new Promise((resolve, reject) => {
  //for successful connection
  db.once('open', () => resolve(db));
  //for error in connection
  db.on('error', reject);
});

require('dotenv').config();
const syncController = require('./sync.controller');
const connectDb = require('../utils/connectDb');

connectDb.then(async db => {
    console.log('connected to mongodb');
    await syncController.sync();
    db.close();
}).catch(console.error)

const express = require('express');
const app = express();
require('dotenv').config();
const { PORT } = require('./config');
const connectDb = require('./utils/connectDb');
const vehicleMakeController = require('./vehicleMake/vehicleMake.controller');

app.get('/', vehicleMakeController.vehiclesMakeWithypes);

app.listen(PORT, async () => {
  await connectDb;
  console.log('DB connected');
  console.log(`Server is listening at http://localhost:${PORT}`);
});

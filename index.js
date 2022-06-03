const express = require('express');
const app = express();
require('dotenv').config();
const { PORT } = require('./config');
const connectDb = require('./utils/connectDb');
const vehicleMake = require('./vehicleMake/vehicleMake.router');

app.use('/vehicleMake', vehicleMake);

app.get('/', (req,res) => res.redirect('/vehicleMake'));

app.listen(PORT, async () => {
  await connectDb;
  console.log('DB connected');
  console.log(`Server is listening at http://localhost:${PORT}`);
});

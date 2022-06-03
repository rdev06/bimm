const router = require('express').Router();
const vehicleMakeController = require('./vehicleMake.controller');

router.get('/', vehicleMakeController.vehiclesMakeWithypes)


module.exports = router;
const mongoose = require('mongoose');

const vehicleSchema = mongoose.Schema({
    makeId: {type: String, require: true, index: 1},
    makeName: {type: String, require: true},
})


module.exports = mongoose.model('vehicleMake', vehicleSchema)
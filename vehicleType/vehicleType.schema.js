const mongoose = require('mongoose');
const vehicleTypeSchema = {
    typeId: {type: String, require: true},
    typeName: {type: String, require: true},
    makeId: {type: String, require: true, index: 1},
}
module.exports = mongoose.model('vehicleType', vehicleTypeSchema)
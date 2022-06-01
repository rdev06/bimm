const service = require('./vehicleMake.service');

module.exports = {
    vehiclesMakeWithypes: async (req,res) => {
        const vehicleMakeData = await service.vehiclesMakeWithypes(req.query);
        res.setHeader('totalCount', vehicleMakeData.totalCount);
        res.setHeader('offset', vehicleMakeData.offset);
        res.setHeader('limit', vehicleMakeData.limit);
        return res.json(vehicleMakeData.vehicleMakes)
    }
}
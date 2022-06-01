const service = require('./vehicleMake.service');

module.exports = {
    vehiclesMakeWithypes: async (req,res) => {
        const offset = parseInt(req.query.offset) || 0;
        const limit = parseInt(req.query.limit) || 20;
        const vehicleMakeData = await service.vehiclesMakeWithypes(offset, limit);
        res.setHeader('totalCount', vehicleMakeData.totalCount);
        res.setHeader('offset', vehicleMakeData.offset);
        res.setHeader('limit', vehicleMakeData.limit);
        return res.json(vehicleMakeData.vehicleMakes)
    }
}
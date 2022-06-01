const vehicleMakeSchema = require('./vehicleMake.schema');

module.exports = {
  vehicleMakeSchema,
  vehiclesMakeWithypes: async ({offset = 0, limit = 20}) => {
    const query = [
      {
        $skip: offset,
      },
      {
        $limit: limit,
      },
      {
        $lookup: {
          from: 'vehicletypes',
          let: {
            makeId: '$makeId',
          },
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: ['$makeId', '$$makeId'],
                },
              },
            },
            {
              $project: {
                _id: 0,
                makeId: 0,
              },
            },
          ],
          as: 'vehicleTypes',
        },
      },
      {
        $project: {
          _id: 0,
        },
      },
    ];
    const vehicleMakes = await vehicleMakeSchema.aggregate(query);
    const totalCount = await vehicleMakeSchema.count();
    return {vehicleMakes, totalCount, offset, limit};
  },
};

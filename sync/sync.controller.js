const helpers = require('../utils/helpers');
const syncService = require('./sync.service');
const vehicleMakeService = require('../vehicleMake/vehicleMake.service');
const vehicleTypeService = require('../vehicleType/vehicleType.service');

// NOTE: We can set origin value `https://vpic.nhtsa.dot.gov` in env file but for now, its O.K

module.exports = {
  getAllVehicleMakes: async () => {
    const {
      Results: { AllVehicleMakes },
    } = await syncService.fetchXmlToJson('https://vpic.nhtsa.dot.gov/api/vehicles/getallmakes?format=XML');
    const toReturn = { makeIds: [], allVehicleMakesUpdateOperation: [] };
    toReturn.allVehicleMakesUpdateOperation = AllVehicleMakes.map(({ Make_ID: makeId, Make_Name: makeName }) => {
      toReturn.makeIds.push(makeId);
      return helpers.createBulkUpdateObject({ makeId }, { makeId, makeName });
    });
    return toReturn;
  },
  getVehicleTypesForMakeId: async (makeId) => {
    if (!makeId) throw 'Make Id is required';
    try {
      const {
        Results: { VehicleTypesForMakeIds },
      } = await syncService.fetchXmlToJson(`https://vpic.nhtsa.dot.gov/api/vehicles/GetVehicleTypesForMakeId/${makeId}?format=xml`);
      if (!VehicleTypesForMakeIds) return [];
      if (Array.isArray(VehicleTypesForMakeIds))
        return VehicleTypesForMakeIds.map(({ VehicleTypeId: typeId, VehicleTypeName: typeName }) =>
          helpers.createBulkUpdateObject({ makeId, typeId }, { makeId, typeId, typeName })
        );
      return helpers.createBulkUpdateObject(
        { makeId, typeId: VehicleTypesForMakeIds.VehicleTypeId },
        { makeId, typeId: VehicleTypesForMakeIds.VehicleTypeId, typeName: VehicleTypesForMakeIds.VehicleTypeName }
      );
    } catch (error) {
      console.log('makeId', makeId);
      return [];
    }
  },
  sync: async function (limit = 20) {
    const { makeIds, allVehicleMakesUpdateOperation } = await this.getAllVehicleMakes();
    console.log('updating vehicle makes');
    await vehicleMakeService.vehicleMakeSchema.bulkWrite(allVehicleMakesUpdateOperation);
    // trying to pull and update data in db in batch . eg: 20
    for (let i = 0; i < makeIds.length; i = i + limit) {
      console.log('index', i);
      const idsTofetch = makeIds.slice(i, i + limit);
      const vehicleTypes = await Promise.all(idsTofetch.map(this.getVehicleTypesForMakeId));
      await vehicleTypeService.vehicleTypeSchema.bulkWrite(vehicleTypes.flat(1));
    }
  },
};

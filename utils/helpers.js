module.exports = {
  createBulkUpdateObject: (filter, update) => ({ updateOne: { filter, update, upsert: true } }),
};

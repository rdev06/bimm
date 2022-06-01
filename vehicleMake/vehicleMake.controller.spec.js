const vehicleMakeController = require('./vehicleMake.controller');

jest.mock('./vehicleMake.service', () => ({
  vehiclesMakeWithypes: jest.fn((limit, offset) => ({ totalCount: 100, limit, offset, vehicleMakes: [] })),
}));

describe('Testing Vehicle Make Controller', () => {
  test('Testing vehiclesMakeWithypes', () => {
      const query = {limit: 20, offset: 20};
    vehicleMakeController.vehiclesMakeWithypes(
      {query},
      {
        setHeader: (key, value) => {
          switch (key) {
            case 'totalCount':
                expect(value).toBe(100);
              break;
            case 'offset':
                expect(value).toBe(query.offset);
              break;
            case 'limit':
                expect(value).toBe(query.limit);
              break;
          }
        },
        json: data => {
            expect(Array.isArray(data)).toBeTruthy()
        }
      }
    );
  });
});

const request = require('supertest');
const app = require('../app');

// We'll mock the Bug model methods to avoid DB dependency
jest.mock('../models/bug');

const Bug = require('../models/bug');

beforeEach(() => {
  jest.clearAllMocks();
});

test('GET /api/bugs returns list', async () => {
  Bug.find.mockResolvedValue([{ title: 'a', status: 'open', _id: '1' }]);
  const res = await request(app).get('/api/bugs');
  expect(res.statusCode).toBe(200);
  expect(Array.isArray(res.body)).toBe(true);
  expect(res.body[0].title).toBe('a');
});

test('POST /api/bugs creates a bug', async () => {
  Bug.prototype.save = jest.fn().mockResolvedValue({ title: 'new', _id: '2' });
  const res = await request(app).post('/api/bugs').send({ title: 'new' });
  expect(res.statusCode).toBe(201);
  expect(res.body.title).toBe('new');
});

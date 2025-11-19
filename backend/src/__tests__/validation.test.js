const { validateBug } = require('../helpers/validation');

test('validateBug returns error for invalid payloads', () => {
  expect(validateBug(null).error).toBe('Invalid payload');
  expect(validateBug({}).error).toMatch(/Title/);
  expect(validateBug({ title: 'ab' }).error).toMatch(/at least 3/);
});

test('validateBug accepts valid bug', () => {
  expect(validateBug({ title: 'A valid title' }).error).toBeNull();
});

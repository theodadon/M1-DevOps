import { expect, test } from 'vitest';
import { createUser, isAdult } from './user.js';

test('createUser correctly creates a user object', () => {
  const name = 'John Doe';
  const age = 25;
  const user = createUser(name, age);

  expect(user.name).toBe(name);
  expect(user.age).toBe(age);
});

test('isAdult returns true for users 18 and older', () => {
  const user = createUser('Jane Doe', 18);
  const result = isAdult(user);

  expect(result).toBe(true);
});

test('isAdult returns false for users under 18', () => {
  const user = createUser('Jimmy Doe', 17);
  const result = isAdult(user);

  expect(result).toBe(false);
});

test('createUser handles negative age values', () => {
  const user = createUser('Invalid Age User', -5);

  expect(user.age).toBe(-5);
});

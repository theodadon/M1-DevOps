import { expect, test, vi } from 'vitest';
import { createUserService } from './userService.js';

test('getUserName returns the user\'s name', async () => {
  const mockApi = {
    fetchUser: vi.fn().mockResolvedValue({ name: 'John Doe' })
  };
  const userService = createUserService(mockApi);

  const name = await userService.getUserName(1);

  expect(mockApi.fetchUser).toHaveBeenCalledWith(1);
  expect(name).toBe('John Doe');
});

test('getUserName throws an error if API call fails', async () => {
  const mockApi = {
    fetchUser: vi.fn().mockRejectedValue(new Error('API Error'))
  };
  const userService = createUserService(mockApi);

  await expect(userService.getUserName(1)).rejects.toThrow('API Error');
});

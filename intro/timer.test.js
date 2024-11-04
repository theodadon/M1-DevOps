import { expect, test, vi } from 'vitest';
import { delayedGreeting } from './timer.js';

test('delayedGreeting calls callback with correct message', () => {
  vi.useFakeTimers();
  const callback = vi.fn();

  delayedGreeting('Alice', callback);
  vi.runAllTimers();

  expect(callback).toHaveBeenCalledWith('Hello, Alice!');
  vi.useRealTimers();
});

test('delayedGreeting calls callback with default message if name is empty', () => {
  vi.useFakeTimers();
  const callback = vi.fn();

  delayedGreeting('', callback);
  vi.runAllTimers();

  expect(callback).toHaveBeenCalledWith('Hello, !');
  vi.useRealTimers();
});

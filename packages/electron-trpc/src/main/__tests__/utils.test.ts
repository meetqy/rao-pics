import { describe, test, expect } from 'vitest';
import { getTRPCErrorFromUnknown } from '../utils';
import { TRPCError } from '@trpc/server';

describe('getTRPCErrorFromUnknown', () => {
  test('should return a TRPCError when given a TRPCError', () => {
    const error = new TRPCError({
      code: 'TIMEOUT',
      cause: new Error('test'),
      message: 'test',
    });
    const result = getTRPCErrorFromUnknown(error);

    expect(result).toBe(error);
  });

  test('should return a TRPCError when given an Error', () => {
    const error = new Error('test');
    const result = getTRPCErrorFromUnknown(error);

    expect(result).toBeInstanceOf(TRPCError);
    expect(result).toMatchObject({
      code: 'INTERNAL_SERVER_ERROR',
      cause: error,
      message: error.message,
    });
  });

  test('should return a TRPCError when given a string', () => {
    const error = 'test';
    const result = getTRPCErrorFromUnknown(error);

    expect(result).toBeInstanceOf(TRPCError);
    expect(result).toMatchObject({
      code: 'INTERNAL_SERVER_ERROR',
      cause: new Error(error),
      message: error,
    });
  });

  test('should use the stack from the given error', () => {
    const error = new Error('test');
    error.stack = 'test stack';
    const result = getTRPCErrorFromUnknown(error);

    expect(result.stack).toBe(error.stack);
  });

  test.each([{ test: 'test' }, undefined, null])(
    'should fallback to "Unknown error" when given an unknown type',
    (error: unknown) => {
      const result = getTRPCErrorFromUnknown(error);

      expect(result).toBeInstanceOf(TRPCError);
      expect(result).toMatchObject({
        code: 'INTERNAL_SERVER_ERROR',
        cause: new Error('Unknown error'),
        message: 'Unknown error',
      });
    }
  );
});

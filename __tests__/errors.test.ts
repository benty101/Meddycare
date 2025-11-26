import {
  AppError,
  AuthenticationError,
  UnauthorizedError,
  ValidationError,
  NotFoundError,
  DuplicateError,
  RateLimitError,
  DatabaseError,
  ExternalServiceError,
  handleError,
} from '@/lib/errors';

describe('Error Handling', () => {
  describe('Custom Error Classes', () => {
    it('should create AuthenticationError with correct status code', () => {
      const error = new AuthenticationError('Invalid credentials');
      expect(error.message).toBe('Invalid credentials');
      expect(error.statusCode).toBe(401);
      expect(error.code).toBe('AUTH_ERROR');
      expect(error.isOperational).toBe(true);
    });

    it('should create UnauthorizedError with correct status code', () => {
      const error = new UnauthorizedError('Access denied');
      expect(error.message).toBe('Access denied');
      expect(error.statusCode).toBe(403);
      expect(error.code).toBe('FORBIDDEN');
    });

    it('should create ValidationError with correct status code', () => {
      const error = new ValidationError('Invalid input');
      expect(error.message).toBe('Invalid input');
      expect(error.statusCode).toBe(400);
      expect(error.code).toBe('VALIDATION_ERROR');
    });

    it('should create NotFoundError with correct status code', () => {
      const error = new NotFoundError('User');
      expect(error.message).toBe('User not found');
      expect(error.statusCode).toBe(404);
      expect(error.code).toBe('NOT_FOUND');
    });

    it('should create DuplicateError with correct status code', () => {
      const error = new DuplicateError('Email already exists');
      expect(error.message).toBe('Email already exists');
      expect(error.statusCode).toBe(409);
      expect(error.code).toBe('DUPLICATE_ERROR');
    });

    it('should create RateLimitError with correct status code', () => {
      const error = new RateLimitError();
      expect(error.message).toBe('Too many requests. Please try again later.');
      expect(error.statusCode).toBe(429);
      expect(error.code).toBe('RATE_LIMIT');
    });

    it('should create DatabaseError with correct status code', () => {
      const error = new DatabaseError('Connection failed');
      expect(error.message).toBe('Connection failed');
      expect(error.statusCode).toBe(500);
      expect(error.code).toBe('DATABASE_ERROR');
    });

    it('should create ExternalServiceError with correct status code', () => {
      const error = new ExternalServiceError('API unavailable');
      expect(error.message).toBe('API unavailable');
      expect(error.statusCode).toBe(503);
      expect(error.code).toBe('EXTERNAL_SERVICE_ERROR');
    });
  });

  describe('handleError function', () => {
    it('should handle AppError correctly', () => {
      const error = new ValidationError('Invalid email');
      const result = handleError(error);

      expect(result.message).toBe('Invalid email');
      expect(result.statusCode).toBe(400);
      expect(result.code).toBe('VALIDATION_ERROR');
    });

    it('should handle Prisma unique constraint error', () => {
      const prismaError = {
        code: 'P2002',
        meta: { target: ['email'] },
      };
      const result = handleError(prismaError);

      expect(result.message).toContain('email');
      expect(result.message).toContain('already exists');
      expect(result.statusCode).toBe(409);
      expect(result.code).toBe('DUPLICATE_ERROR');
    });

    it('should handle Prisma record not found error', () => {
      const prismaError = {
        code: 'P2025',
        message: 'Record not found',
      };
      const result = handleError(prismaError);

      expect(result.message).toBe('Record not found');
      expect(result.statusCode).toBe(404);
      expect(result.code).toBe('NOT_FOUND');
    });

    it('should handle Prisma foreign key constraint error', () => {
      const prismaError = {
        code: 'P2003',
        message: 'Foreign key constraint failed',
      };
      const result = handleError(prismaError);

      expect(result.message).toBe('Foreign key constraint failed');
      expect(result.statusCode).toBe(400);
      expect(result.code).toBe('VALIDATION_ERROR');
    });

    it('should handle generic Error', () => {
      const error = new Error('Something went wrong');
      const result = handleError(error);

      expect(result.message).toBe('Something went wrong');
      expect(result.statusCode).toBe(500);
    });

    it('should handle unknown error types', () => {
      const error = { unknown: 'error' };
      const result = handleError(error);

      expect(result.message).toBe('An unexpected error occurred');
      expect(result.statusCode).toBe(500);
    });

    it('should handle Zod validation errors', () => {
      const zodError = {
        name: 'ZodError',
        errors: [
          { path: ['email'], message: 'Invalid email' },
          { path: ['password'], message: 'Too short' },
        ],
      };
      const result = handleError(zodError);

      expect(result.message).toContain('email: Invalid email');
      expect(result.message).toContain('password: Too short');
      expect(result.statusCode).toBe(400);
      expect(result.code).toBe('VALIDATION_ERROR');
    });
  });

  describe('Error operational flag', () => {
    it('should mark AppError as operational', () => {
      const error = new AuthenticationError();
      expect(error.isOperational).toBe(true);
    });

    it('should mark non-AppError as non-operational', () => {
      const error = new Error('Unexpected');
      expect((error as any).isOperational).toBeUndefined();
    });
  });
});

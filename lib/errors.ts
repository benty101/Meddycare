/**
 * MeddyCare Error Handling Framework
 * Centralized error types and handling utilities
 */

export class AppError extends Error {
  constructor(
    message: string,
    public statusCode: number = 500,
    public code?: string,
    public isOperational: boolean = true
  ) {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

// Authentication Errors
export class AuthenticationError extends AppError {
  constructor(message: string = 'Authentication failed') {
    super(message, 401, 'AUTH_ERROR');
  }
}

export class UnauthorizedError extends AppError {
  constructor(message: string = 'Unauthorized access') {
    super(message, 403, 'UNAUTHORIZED');
  }
}

export class TokenExpiredError extends AppError {
  constructor(message: string = 'Token has expired') {
    super(message, 401, 'TOKEN_EXPIRED');
  }
}

// Validation Errors
export class ValidationError extends AppError {
  constructor(message: string, public errors?: any) {
    super(message, 400, 'VALIDATION_ERROR');
  }
}

export class NotFoundError extends AppError {
  constructor(resource: string = 'Resource') {
    super(`${resource} not found`, 404, 'NOT_FOUND');
  }
}

// Business Logic Errors
export class DuplicateError extends AppError {
  constructor(resource: string) {
    super(`${resource} already exists`, 409, 'DUPLICATE');
  }
}

export class ForbiddenError extends AppError {
  constructor(message: string = 'Access forbidden') {
    super(message, 403, 'FORBIDDEN');
  }
}

export class RateLimitError extends AppError {
  constructor(message: string = 'Too many requests') {
    super(message, 429, 'RATE_LIMIT');
  }
}

// Database Errors
export class DatabaseError extends AppError {
  constructor(message: string = 'Database error occurred') {
    super(message, 500, 'DATABASE_ERROR', false);
  }
}

// External Service Errors
export class ExternalServiceError extends AppError {
  constructor(service: string, message?: string) {
    super(
      message || `${service} service unavailable`,
      503,
      'EXTERNAL_SERVICE_ERROR',
      false
    );
  }
}

/**
 * Error handler for API routes
 */
export function handleError(error: unknown): {
  message: string;
  statusCode: number;
  code?: string;
  errors?: any;
} {
  // Log error for monitoring
  console.error('Error occurred:', error);

  // Handle known application errors
  if (error instanceof AppError) {
    return {
      message: error.message,
      statusCode: error.statusCode,
      code: error.code,
      errors: error instanceof ValidationError ? error.errors : undefined,
    };
  }

  // Handle Prisma errors
  if (error && typeof error === 'object' && 'code' in error) {
    const prismaError = error as any;

    // Unique constraint violation
    if (prismaError.code === 'P2002') {
      return {
        message: 'A record with this information already exists',
        statusCode: 409,
        code: 'DUPLICATE',
      };
    }

    // Foreign key constraint violation
    if (prismaError.code === 'P2003') {
      return {
        message: 'Related record not found',
        statusCode: 400,
        code: 'INVALID_REFERENCE',
      };
    }

    // Record not found
    if (prismaError.code === 'P2025') {
      return {
        message: 'Record not found',
        statusCode: 404,
        code: 'NOT_FOUND',
      };
    }
  }

  // Handle validation errors from Zod or other validators
  if (error && typeof error === 'object' && 'issues' in error) {
    return {
      message: 'Validation failed',
      statusCode: 400,
      code: 'VALIDATION_ERROR',
      errors: (error as any).issues,
    };
  }

  // Handle generic errors
  if (error instanceof Error) {
    return {
      message: process.env.NODE_ENV === 'production'
        ? 'An unexpected error occurred'
        : error.message,
      statusCode: 500,
      code: 'INTERNAL_ERROR',
    };
  }

  // Fallback for unknown error types
  return {
    message: 'An unexpected error occurred',
    statusCode: 500,
    code: 'UNKNOWN_ERROR',
  };
}

/**
 * Async error wrapper for API routes
 * Catches errors and formats them consistently
 */
export function asyncHandler<T>(
  handler: (req: Request, context?: any) => Promise<T>
) {
  return async (req: Request, context?: any) => {
    try {
      return await handler(req, context);
    } catch (error) {
      const errorResponse = handleError(error);
      return Response.json(
        {
          error: errorResponse.message,
          code: errorResponse.code,
          ...(errorResponse.errors && { errors: errorResponse.errors }),
        },
        { status: errorResponse.statusCode }
      );
    }
  };
}

/**
 * Assert function for validations
 */
export function assert(
  condition: boolean,
  message: string,
  ErrorClass: typeof AppError = AppError
): asserts condition {
  if (!condition) {
    throw new ErrorClass(message);
  }
}

/**
 * Type guard to check if error is operational
 */
export function isOperationalError(error: unknown): boolean {
  if (error instanceof AppError) {
    return error.isOperational;
  }
  return false;
}

/**
 * API Middleware Utilities
 * Reusable middleware functions for API routes
 */

import { NextRequest, NextResponse } from 'next/server';
import { handleError } from './errors';

/**
 * Wrap an API handler with error handling
 */
export function withErrorHandler<T = any>(
  handler: (req: NextRequest, context?: any) => Promise<NextResponse<T>>
) {
  return async (req: NextRequest, context?: any): Promise<NextResponse> => {
    try {
      return await handler(req, context);
    } catch (error) {
      const errorResponse = handleError(error);
      return NextResponse.json(
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
 * Rate limiting middleware (simple in-memory implementation)
 * For production, use Redis or similar
 */
const requestCounts = new Map<string, { count: number; resetAt: number }>();

export function withRateLimit(
  limit: number = 100,
  windowMs: number = 60000 // 1 minute
) {
  return function <T>(
    handler: (req: NextRequest, context?: any) => Promise<NextResponse<T>>
  ) {
    return async (req: NextRequest, context?: any): Promise<NextResponse> => {
      const identifier = req.headers.get('x-forwarded-for') || 'unknown';
      const now = Date.now();

      const record = requestCounts.get(identifier);

      if (!record || now > record.resetAt) {
        requestCounts.set(identifier, {
          count: 1,
          resetAt: now + windowMs,
        });
      } else if (record.count >= limit) {
        return NextResponse.json(
          {
            error: 'Too many requests. Please try again later.',
            code: 'RATE_LIMIT',
          },
          {
            status: 429,
            headers: {
              'Retry-After': String(Math.ceil((record.resetAt - now) / 1000)),
            },
          }
        );
      } else {
        record.count++;
      }

      return handler(req, context);
    };
  };
}

/**
 * Request logging middleware
 */
export function withLogging<T>(
  handler: (req: NextRequest, context?: any) => Promise<NextResponse<T>>
) {
  return async (req: NextRequest, context?: any): Promise<NextResponse> => {
    const start = Date.now();
    const method = req.method;
    const url = req.url;

    try {
      const response = await handler(req, context);
      const duration = Date.now() - start;

      console.log(`${method} ${url} - ${response.status} (${duration}ms)`);

      return response;
    } catch (error) {
      const duration = Date.now() - start;
      console.error(`${method} ${url} - ERROR (${duration}ms)`, error);
      throw error;
    }
  };
}

/**
 * CORS middleware
 */
export function withCORS<T>(
  handler: (req: NextRequest, context?: any) => Promise<NextResponse<T>>,
  options: {
    origins?: string[];
    methods?: string[];
    headers?: string[];
  } = {}
) {
  return async (req: NextRequest, context?: any): Promise<NextResponse> => {
    const {
      origins = ['*'],
      methods = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
      headers = ['Content-Type', 'Authorization'],
    } = options;

    // Handle preflight
    if (req.method === 'OPTIONS') {
      return new NextResponse(null, {
        status: 204,
        headers: {
          'Access-Control-Allow-Origin': origins.join(', '),
          'Access-Control-Allow-Methods': methods.join(', '),
          'Access-Control-Allow-Headers': headers.join(', '),
          'Access-Control-Max-Age': '86400',
        },
      });
    }

    const response = await handler(req, context);

    // Add CORS headers to response
    response.headers.set('Access-Control-Allow-Origin', origins.join(', '));
    response.headers.set('Access-Control-Allow-Methods', methods.join(', '));
    response.headers.set('Access-Control-Allow-Headers', headers.join(', '));

    return response;
  };
}

/**
 * Compose multiple middleware functions
 */
export function compose<T>(
  ...middlewares: Array<
    (
      handler: (req: NextRequest, context?: any) => Promise<NextResponse<T>>
    ) => (req: NextRequest, context?: any) => Promise<NextResponse>
  >
) {
  return function (
    handler: (req: NextRequest, context?: any) => Promise<NextResponse<T>>
  ) {
    return middlewares.reduceRight(
      (acc, middleware) => middleware(acc),
      handler
    );
  };
}

/**
 * Helper to validate request body against a schema
 */
export async function validateBody<T>(
  req: NextRequest,
  schema: { parse: (data: unknown) => T }
): Promise<T> {
  try {
    const body = await req.json();
    return schema.parse(body);
  } catch (error) {
    throw error; // Will be caught by error handler
  }
}

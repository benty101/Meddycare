import { NextResponse } from 'next/server';

/**
 * @swagger
 * /api/docs:
 *   get:
 *     summary: API Documentation
 *     description: Returns OpenAPI/Swagger documentation for MeddyCare API
 *     responses:
 *       200:
 *         description: API documentation in JSON format
 */
export async function GET() {
    const apiDocs = {
        openapi: '3.0.0',
        info: {
            title: 'MeddyCare API',
            version: '1.0.0',
            description: 'API documentation for the MeddyCare platform connecting families with carers',
            contact: {
                email: 'hello@meddycare.com'
            }
        },
        servers: [
            {
                url: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000',
                description: 'API Server'
            }
        ],
        paths: {
            '/api/auth/register': {
                post: {
                    tags: ['Authentication'],
                    summary: 'Register a new user',
                    requestBody: {
                        required: true,
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        email: { type: 'string', format: 'email' },
                                        password: { type: 'string', minLength: 8 },
                                        role: { type: 'string', enum: ['family', 'carer'] },
                                        firstName: { type: 'string' },
                                        lastName: { type: 'string' }
                                    },
                                    required: ['email', 'password', 'role']
                                }
                            }
                        }
                    },
                    responses: {
                        201: { description: 'User created successfully' },
                        400: { description: 'Invalid input' },
                        409: { description: 'User already exists' }
                    }
                }
            },
            '/api/auth/login': {
                post: {
                    tags: ['Authentication'],
                    summary: 'Login user',
                    requestBody: {
                        required: true,
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        email: { type: 'string', format: 'email' },
                                        password: { type: 'string' }
                                    },
                                    required: ['email', 'password']
                                }
                            }
                        }
                    },
                    responses: {
                        200: { description: 'Login successful, returns JWT token' },
                        401: { description: 'Invalid credentials' }
                    }
                }
            },
            '/api/care-requests': {
                get: {
                    tags: ['Care Requests'],
                    summary: 'Get all care requests for the authenticated family',
                    security: [{ bearerAuth: [] }],
                    responses: {
                        200: { description: 'List of care requests' },
                        401: { description: 'Unauthorized' }
                    }
                },
                post: {
                    tags: ['Care Requests'],
                    summary: 'Create a new care request',
                    security: [{ bearerAuth: [] }],
                    requestBody: {
                        required: true,
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        recipientId: { type: 'string', format: 'uuid' },
                                        careType: { type: 'string', enum: ['live_in', 'hourly', 'respite', 'specialist'] },
                                        scheduleType: { type: 'string', enum: ['full_time', 'part_time', 'temporary'] },
                                        budgetMin: { type: 'number' },
                                        budgetMax: { type: 'number' },
                                        startDate: { type: 'string', format: 'date-time' }
                                    },
                                    required: ['recipientId', 'careType', 'scheduleType', 'budgetMin', 'budgetMax']
                                }
                            }
                        }
                    },
                    responses: {
                        201: { description: 'Care request created' },
                        400: { description: 'Invalid input' }
                    }
                }
            },
            '/api/care-logs': {
                get: {
                    tags: ['Care Logs'],
                    summary: 'Get care logs for authenticated user',
                    security: [{ bearerAuth: [] }],
                    responses: {
                        200: { description: 'List of care logs' }
                    }
                },
                post: {
                    tags: ['Care Logs'],
                    summary: 'Create a new care log (Carer only)',
                    security: [{ bearerAuth: [] }],
                    requestBody: {
                        required: true,
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        placementId: { type: 'string', format: 'uuid' },
                                        logDate: { type: 'string', format: 'date' },
                                        activities: { type: 'object' },
                                        meals: { type: 'object' },
                                        medicationsGiven: { type: 'array', items: { type: 'string' } },
                                        mood: { type: 'string', enum: ['excellent', 'good', 'neutral', 'low', 'concerning'] },
                                        notes: { type: 'string' }
                                    },
                                    required: ['placementId', 'logDate', 'mood']
                                }
                            }
                        }
                    },
                    responses: {
                        201: { description: 'Care log created' },
                        403: { description: 'Forbidden - Carer role required' }
                    }
                }
            },
            '/api/matches/{matchId}/hire': {
                post: {
                    tags: ['Matches'],
                    summary: 'Hire a carer from a match (Family only)',
                    security: [{ bearerAuth: [] }],
                    parameters: [
                        {
                            name: 'matchId',
                            in: 'path',
                            required: true,
                            schema: { type: 'string', format: 'uuid' }
                        }
                    ],
                    responses: {
                        200: { description: 'Carer hired, placement created' },
                        404: { description: 'Match not found' },
                        403: { description: 'Forbidden' }
                    }
                }
            },
            '/api/messages': {
                get: {
                    tags: ['Messages'],
                    summary: 'Get messages for authenticated user',
                    security: [{ bearerAuth: [] }],
                    responses: {
                        200: { description: 'List of messages' }
                    }
                },
                post: {
                    tags: ['Messages'],
                    summary: 'Send a message',
                    security: [{ bearerAuth: [] }],
                    requestBody: {
                        required: true,
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        recipientId: { type: 'string', format: 'uuid' },
                                        content: { type: 'string' },
                                        matchId: { type: 'string', format: 'uuid' }
                                    },
                                    required: ['recipientId', 'content']
                                }
                            }
                        }
                    },
                    responses: {
                        201: { description: 'Message sent' }
                    }
                }
            },
            '/api/user/profile': {
                get: {
                    tags: ['User'],
                    summary: 'Get authenticated user profile',
                    security: [{ bearerAuth: [] }],
                    responses: {
                        200: { description: 'User profile data' }
                    }
                },
                put: {
                    tags: ['User'],
                    summary: 'Update user profile',
                    security: [{ bearerAuth: [] }],
                    requestBody: {
                        required: true,
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        firstName: { type: 'string' },
                                        lastName: { type: 'string' },
                                        phone: { type: 'string' },
                                        address: { type: 'string' },
                                        postcode: { type: 'string' },
                                        bio: { type: 'string' },
                                        yearsExperience: { type: 'integer' },
                                        hourlyRate: { type: 'number' }
                                    }
                                }
                            }
                        }
                    },
                    responses: {
                        200: { description: 'Profile updated' }
                    }
                }
            }
        },
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT'
                }
            }
        }
    };

    return NextResponse.json(apiDocs);
}

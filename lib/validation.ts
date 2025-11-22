import { z } from 'zod';

/**
 * Validation schemas for API requests
 */

// User Registration
export const registerSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    role: z.enum(['family', 'carer']),
    firstName: z.string().min(1, 'First name is required'),
    lastName: z.string().min(1, 'Last name is required'),
    phone: z.string().min(10, 'Valid phone number is required'),
    postcode: z.string().min(5, 'Valid postcode is required'),
});

// User Login
export const loginSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(1, 'Password is required'),
});

// Password Reset Request
export const forgotPasswordSchema = z.object({
    email: z.string().email('Invalid email address'),
});

// Password Reset
export const resetPasswordSchema = z.object({
    token: z.string().min(1, 'Reset token is required'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
});

// Care Request
export const careRequestSchema = z.object({
    recipientId: z.string().uuid('Invalid recipient ID'),
    careType: z.enum(['live_in', 'hourly', 'respite', 'specialist']),
    scheduleType: z.enum(['full_time', 'part_time', 'temporary']),
    startDate: z.string().optional(),
    budgetMin: z.number().min(0, 'Budget must be positive'),
    budgetMax: z.number().min(0, 'Budget must be positive'),
});

// Care Recipient
export const careRecipientSchema = z.object({
    firstName: z.string().min(1, 'First name is required'),
    lastName: z.string().min(1, 'Last name is required'),
    age: z.number().min(0).max(150, 'Invalid age'),
    gender: z.enum(['male', 'female', 'other']),
    recipientType: z.enum(['elderly', 'child', 'adult']),
    mobilityLevel: z.enum(['independent', 'some_assistance', 'full_support']),
    medicalConditions: z.string().optional(),
    specialRequirements: z.string().optional(),
});

// Carer Application
export const carerApplicationSchema = z.object({
    careRequestId: z.string().uuid('Invalid care request ID'),
});

// Care Log
export const careLogSchema = z.object({
    placementId: z.string().uuid('Invalid placement ID'),
    logDate: z.string(),
    activities: z.any(),
    meals: z.any(),
    medicationsGiven: z.any(),
    mood: z.enum(['excellent', 'good', 'neutral', 'low', 'concerning']),
    notes: z.string().optional(),
});

// Health Record
export const healthRecordSchema = z.object({
    recipientId: z.string().uuid('Invalid recipient ID'),
    recordType: z.enum(['vital_signs', 'weight', 'medication', 'incident', 'wellness']),
    data: z.any(),
    recordedAt: z.string(),
});

// Profile Update
export const profileUpdateSchema = z.object({
    firstName: z.string().min(1).optional(),
    lastName: z.string().min(1).optional(),
    phone: z.string().min(10).optional(),
    bio: z.string().optional(),
    address: z.string().optional(),
    postcode: z.string().min(5).optional(),
});

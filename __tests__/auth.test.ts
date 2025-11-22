import { hashPassword, verifyPassword, createToken, verifyToken, getUserFromToken } from '@/lib/auth';

// Mock environment variable
process.env.JWT_SECRET = 'test-secret-key';

// Mock jose library
jest.mock('jose', () => ({
    SignJWT: jest.fn().mockImplementation(() => ({
        setProtectedHeader: jest.fn().mockReturnThis(),
        setExpirationTime: jest.fn().mockReturnThis(),
        sign: jest.fn().mockResolvedValue('mocked-token'),
    })),
    jwtVerify: jest.fn().mockImplementation((token) => {
        if (token === 'valid-token') {
            return Promise.resolve({
                payload: { userId: 'user-123', role: 'family' }
            });
        } else if (token === 'mocked-token') {
            return Promise.resolve({
                payload: { userId: 'user-123', role: 'family' }
            });
        }
        return Promise.reject(new Error('Invalid token'));
    }),
}));

describe('Auth Utils', () => {
    describe('Password Hashing', () => {
        it('should hash a password correctly', async () => {
            const password = 'password123';
            const hashedPassword = await hashPassword(password);
            expect(hashedPassword).not.toBe(password);
            expect(hashedPassword).toHaveLength(60); // bcrypt hash length
        });

        it('should verify a correct password', async () => {
            const password = 'password123';
            const hashedPassword = await hashPassword(password);
            const isValid = await verifyPassword(password, hashedPassword);
            expect(isValid).toBe(true);
        });

        it('should reject an incorrect password', async () => {
            const password = 'password123';
            const hashedPassword = await hashPassword(password);
            const isValid = await verifyPassword('wrongpassword', hashedPassword);
            expect(isValid).toBe(false);
        });
    });

    describe('Token Management', () => {
        it('should create a token', async () => {
            const userId = 'user-123';
            const role = 'family';
            const token = await createToken(userId, role);

            expect(token).toBe('mocked-token');
        });

        it('should verify a valid token', async () => {
            const payload = await verifyToken('valid-token');
            expect(payload).toEqual({ userId: 'user-123', role: 'family' });
        });

        it('should return null for an invalid token', async () => {
            const payload = await verifyToken('invalid-token');
            expect(payload).toBeNull();
        });

        it('should extract user data from token', async () => {
            const userData = await getUserFromToken('valid-token');
            expect(userData).toEqual({ userId: 'user-123', role: 'family' });
        });

        it('should return null user data for invalid token', async () => {
            const userData = await getUserFromToken('invalid-token');
            expect(userData).toBeNull();
        });
    });
});

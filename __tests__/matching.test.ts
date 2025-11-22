import { calculateDistance, extractRequiredSpecializations, determineCarerTier } from '@/lib/matching';

describe('Matching Logic', () => {
    describe('calculateDistance', () => {
        it('should calculate distance between two points correctly', () => {
            // London (51.5074, -0.1278) to Paris (48.8566, 2.3522) is approx 344km
            const dist = calculateDistance(51.5074, -0.1278, 48.8566, 2.3522);
            expect(dist).toBeCloseTo(343.5, 0); // Allow some variance
        });

        it('should return 0 for same location', () => {
            const dist = calculateDistance(51.5074, -0.1278, 51.5074, -0.1278);
            expect(dist).toBe(0);
        });
    });

    describe('extractRequiredSpecializations', () => {
        it('should extract dementia specialization', () => {
            const specs = extractRequiredSpecializations('Patient has Alzheimer\'s', 'independent');
            expect(specs).toContain('dementia');
        });

        it('should extract mobility support for full support', () => {
            const specs = extractRequiredSpecializations('', 'full_support');
            expect(specs).toContain('mobility_support');
        });

        it('should default to elderly care', () => {
            const specs = extractRequiredSpecializations('', 'independent');
            expect(specs).toContain('elderly_care');
        });

        it('should handle multiple conditions', () => {
            const specs = extractRequiredSpecializations('Dementia and post-op recovery', 'some_assistance');
            expect(specs).toContain('dementia');
            expect(specs).toContain('post_surgery');
            expect(specs).toContain('mobility_support');
        });
    });

    describe('determineCarerTier', () => {
        it('should return premium for high experience', () => {
            const carer = { yearsExperience: 6, specializations: [] };
            const tier = determineCarerTier(carer);
            expect(tier).toBe('premium');
        });

        it('should return premium for medium experience with specialist skills', () => {
            const carer = {
                yearsExperience: 3,
                specializations: [{ specialization: 'dementia' }]
            };
            const tier = determineCarerTier(carer);
            expect(tier).toBe('premium');
        });

        it('should return enhanced for medium experience', () => {
            const carer = { yearsExperience: 4, specializations: [] };
            const tier = determineCarerTier(carer);
            expect(tier).toBe('enhanced');
        });

        it('should return enhanced for specialist skills with low experience', () => {
            const carer = {
                yearsExperience: 1,
                specializations: [{ specialization: 'palliative' }]
            };
            const tier = determineCarerTier(carer);
            expect(tier).toBe('enhanced');
        });

        it('should return standard for low experience and no specialist skills', () => {
            const carer = { yearsExperience: 1, specializations: [] };
            const tier = determineCarerTier(carer);
            expect(tier).toBe('standard');
        });
    });
});

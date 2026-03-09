import apiClient from '@/services/apiClient';

describe('Integrity Test', () => {
    test('Environment should have NEXT_PUBLIC_API_URL defined or use default', () => {
        const baseUrl = apiClient.defaults.baseURL;
        expect(baseUrl).toBeDefined();
        // It should either be the public API or the local fallback
        expect(typeof baseUrl).toBe('string');
        console.log(`[CI/CD] Using API Base URL: ${baseUrl}`);
    });

    test('Project scripts should be detectable', () => {
        const pkg = require('../package.json');
        expect(pkg.scripts.test).toBeDefined();
        expect(pkg.scripts.build).toBeDefined();
        expect(pkg.scripts.lint).toBeDefined();
    });

    test('Essential services should be importable', () => {
        expect(apiClient).toBeDefined();
    });
});

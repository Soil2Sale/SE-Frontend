import type { Config } from 'jest';

const config: Config = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/$1',
        // Handle CSS imports (if any)
        '\\.(css|less|sass|scss)$': 'identity-obj-proxy',
    },
    transform: {
        '^.+\\.(ts|tsx)$': ['ts-jest', {
            tsconfig: 'tsconfig.json',
            // aggressive isolation for reliable tests
            isolatedModules: true,
        }],
    },
    // Ignore next.js build files and node_modules
    testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
    // Coverage configuration
    collectCoverage: true,
    collectCoverageFrom: [
        'components/**/*.{ts,tsx}',
        'services/**/*.{ts,tsx}',
        '!services/apiClient.ts', // Exclude axios instance setup
        '!**/*.d.ts',
        '!**/node_modules/**',
    ],
};

export default config;

/** @type {import('ts-jest').JestConfigWithTsJest} */
export default {
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        tsconfig: 'tsconfig.test.json',
        diagnostics: { ignoreCodes: [1343] }, // import.meta is handled by the transformer below
        astTransformers: {
          before: [
            {
              // Replaces Vite's import.meta.env so App.tsx can run under Jest unchanged
              path: 'ts-jest-mock-import-meta',
              options: { metaObjectReplacement: { env: { VITE_TMDB_ACCESS_TOKEN: 'test-token' } } },
            },
          ],
        },
      },
    ],
  },
  setupFilesAfterEnv: ['<rootDir>/src/test/setupTests.ts'],
  moduleNameMapper: {
    // Stylesheets are irrelevant to behaviour under test
    '\\.(css|less|scss)$': '<rootDir>/src/test/styleMock.ts',
  },
};

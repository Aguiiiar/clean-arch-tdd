export default {
  preset: '@shelf/jest-mongodb',
  moduleFileExtensions: ['js', 'json', 'ts'],
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest'
  },
  roots: ['<rootDir>/src'],
  collectCoverageFrom: [
    '**/*.(t|j)s',
    '!<rootDir>/src/main/**',
    '!<rootDir>/src/**/*.protocol.ts',
    '!<rootDir>/src/**/index.ts',
    '!<rootDir>/src/**/*.error.ts',
    '!<rootDir>/src/**/*.helper.ts'
  ],
  coverageDirectory: 'coverage',
  collectCoverage: true,
  testEnvironment: 'node'
}

// import { pathsToModuleNameMapper } from 'ts-jest'
// import { compilerOptions } from './tsconfig.json'

export default {
  moduleFileExtensions: ['js', 'json', 'ts'],
  testRegex: '.*\\..*test\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest'
  },
  collectCoverageFrom: ['**/*.(t|j)s'],
  coverageDirectory: 'coverage',
  collectCoverage: false
  // testEnvironment: 'node',
}

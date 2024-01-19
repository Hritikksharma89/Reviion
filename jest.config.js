/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  extensionsToTreatAsEsm: ['.ts'],
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        useESM: true,
      },
    ],
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@/constant/(.*)$': '<rootDir>/src/constant/$1',
    '^@/controller/(.*)$': '<rootDir>/src/controller/$1',
    '^@/config/(.*)$': '<rootDir>/src/config/$1',
    '^@/factory/(.*)$': '<rootDir>/src/factory/$1',
    '^@/services/(.*)$': '<rootDir>/src/services/$1',
    '^@/database/(.*)$': '<rootDir>/src/database/$1',
    '^@/interface/(.*)$': '<rootDir>/src/interface/$1',
    '^@/authentication/(.*)$': '<rootDir>/src/authentication/$1',
    '^@/middleware/(.*)$': '<rootDir>/src/middleware/$1',
    '^@/models/(.*)$': '<rootDir>/src/models/$1',
    '^@/routes/(.*)$': '<rootDir>/src/routes/$1',
    '^@/schemas/(.*)$': '<rootDir>/src/schemas/$1',
    '^@/utils/(.*)$': '<rootDir>/src/utils/$1',
    '^@/validation/(.*)$': '<rootDir>/src/validation/$1',
  },
}
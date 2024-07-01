/* eslint-disable */
/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: {
    '^@src/(.*)$': '<rootDir>/src/$1',
    '^@utils/(.*)$': '<rootDir>/src/utils/$1',
  },
  testMatch: [
    '**/__tests__/**/*.+(ts)',
    '!**/__tests__/**/utils.ts'
  ],
  prettierPath: require.resolve('prettier-2'),
};
export default {
  testEnvironment: 'node',
  testMatch: ['**/?(*.)+(spec).js'],
  transform: {
    '^.+\\.js$': 'babel-jest',
  },
  moduleFileExtensions: ['js', 'json', 'node'],
  coverageDirectory: 'coverage',
  collectCoverage: true,
  collectCoverageFrom: ['**/*.js', '!**/node_modules/**'],
};

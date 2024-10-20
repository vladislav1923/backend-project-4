export default {
  testEnvironment: 'node', // Use 'node' environment for Node.js testing
  transform: {
    '^.+\\.js$': 'babel-jest', // Use babel-jest for transforming JavaScript files
  },
  moduleFileExtensions: ['js', 'json', 'node'], // Supported file extensions
  coverageDirectory: 'coverage', // Directory for coverage reports
  collectCoverage: true, // Enable coverage collection
  collectCoverageFrom: ['**/*.js', '!**/node_modules/**'], // Specify files for coverage collection
};

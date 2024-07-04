module.exports = {
    testEnvironment: 'node',
    testMatch: ['**/tests/**/*.js'],
    collectCoverage: true,
    coverageDirectory: 'coverage',
    coveragePathIgnorePatterns: [
      '/node_modules/',
      '/tests/'
    ],
    verbose: true
  };
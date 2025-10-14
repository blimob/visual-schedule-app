export default {
  testEnvironment: 'node',
  transform: {
    '^.+\\.js$': 'babel-jest',
  },
  moduleFileExtensions: ['js'],
  testMatch: ['**/tests/**/*.test.js'],
  moduleNameMapper: {
    '^/node_modules/visual-schedule/(.*)$': '<rootDir>/node_modules/visual-schedule/$1'
  },
  collectCoverageFrom: [
    'src/**/*.js',
    '!src/**/*.test.js',
    '!src/index.js'
  ]
}
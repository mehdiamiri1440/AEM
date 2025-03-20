module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  verbose: true,
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageReporters: ["json", "lcov", "text", "clover"],
  moduleNameMapper: {
    "@configs/(.*)": "<rootDir>/src/configs/$1",
    "@controllers/(.*)": "<rootDir>/src/controllers/$1",
    "@routes/(.*)": "<rootDir>/src/routes/$1",
    "@services/(.*)": "<rootDir>/src/services/$1",
    "@middlewares/(.*)": "<rootDir>/src/middlewares/$1",
    "@utils/(.*)": "<rootDir>/src/utils/$1",
    "@enums/(.*)": "<rootDir>/src/enums/$1",
  },
};

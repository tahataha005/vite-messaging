module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  moduleNameMapper: {
    "\\.(css|less|sass|scss)$": "<rootDir>/src/test/styleMock.js",
  },
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
};

/** @type {import('ts-jest/dist/types').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  collectCoverage: true,
  collectCoverageFrom: [
    "app/**/*.ts(x)",
    "api/**/*.(t|j)sx?$",
    "!app/root.tsx",
    "!app/entry.client.tsx",
    "!app/entry.server.tsx",
    "!app/routes/**/*.tsx",
    "!app/**/stories.tsx",
  ],
  coverageDirectory: "coverage",
  coverageThreshold: {
    global: {
      branches: 0,
      functions: 0,
      lines: 0,
      statements: 0,
    },
  },
  testPathIgnorePatterns: ["/node_modules/", ".cache/"],
  moduleNameMapper: {
    "^~/(.*)$": "<rootDir>/app/$1",
  },
  roots: ["<rootDir>"],
  setupFilesAfterEnv: ["<rootDir>/config/jest.setup.ts"],
};

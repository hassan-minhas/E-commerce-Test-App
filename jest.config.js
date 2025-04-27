export const preset = "ts-jest";
export const testEnvironment = "jsdom";
export const moduleNameMapper = {
  "^@/(.*)$": "<rootDir>/src/$1",
};
export const setupFilesAfterEnv = ["@testing-library/jest-dom/extend-expect"];
export const testPathIgnorePatterns = ["/node_modules/", "/.next/"];
export const transform = {
  "^.+\\.(ts|tsx)$": "ts-jest",
};

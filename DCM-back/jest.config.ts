import type { Config } from "@jest/types";

const config: Config.InitialOptions = {
    verbose: true,
    transform: {
        "^.+\\.(ts|tsx)$": "ts-jest",
    },
    testMatch: [
        "**/__tests__/**/*.test.[jt]s?(x)",
        "**/?(*.)+(spec|test).[tj]s?(x)"
    ],
    setupFiles: ["<rootDir>/jest.setup.ts"],
    "collectCoverage": true,
    "coverageReporters": ["json", "html"],
    coverageThreshold: {
        global: {
          branches: 100,
          functions: 100,
          lines: 100,
          statements: 100,
        },
      },
      "testTimeout": 30000 
};
export default config;
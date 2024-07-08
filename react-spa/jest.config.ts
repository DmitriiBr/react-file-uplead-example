import type { Config } from "jest";

const config: Config = {
  clearMocks: true,
  // coveragePathIgnorePatterns: [
  //   "/node_modules/"
  // ],
  // coverageProvider: "babel",
  // coverageReporters: [
  //   "json",
  //   "text",
  //   "lcov",
  //   "clover"
  // ],
  // coverageThreshold: undefined,
  // dependencyExtractor: undefined,
  // errorOnDeprecated: false, fakeTimers: {
  //   "enableGlobally": false
  // },
  // forceCoverageMatch: [],
  // globalSetup: undefined,
  // globalTeardown: undefined,
  // globals: {},
  // maxWorkers: "50%",
  // moduleDirectories: [
  //   "node_modules"
  // ],
  moduleFileExtensions: ["js", "mjs", "cjs", "jsx", "ts", "tsx"],
  moduleNameMapper: {
    "^.+\\.css$": "identity-obj-proxy",
  },
  // modulePathIgnorePatterns: [],
  // notify: false,
  // notifyMode: "failure-change",
  // preset: undefined,
  // projects: undefined,
  // reporters: undefined,
  // resetMocks: false,
  // resetModules: false,
  // resolver: undefined,
  // roots: [
  //   "<rootDir>"
  // ],
  // runner: "jest-runner",
  // setupFiles: [],
  // setupFilesAfterEnv: [],
  // snapshotSerializers: [],
  testEnvironment: "jsdom",
  transform: {
    "\\.[jt]sx?$": ["ts-jest", { tsconfig: "./tsconfig.app.json" }],
  },
  // testEnvironmentOptions: {},
  // testLocationInResults: false,
  // testMatch: [
  //   "**/__tests__/**/*.[jt]s?(x)",
  //   "**/?(*.)+(spec|test).[tj]s?(x)"
  // ],
  testPathIgnorePatterns: ["/node_modules/"],
  transformIgnorePatterns: ["/node_modules/"],
  // testRegex: [],
  // testResultsProcessor: undefined,
  // testRunner: "jest-circus/runner",
  // unmockedModulePathPatterns: undefined,
  // watchman: true,
};

export default config;

module.exports = {
  collectCoverage: true,
  collectCoverageFrom: [
    "src/**/*.{ts,tsx}", // adjust this pattern to match your files
  ],
  coverageDirectory: "coverage",
  coverageReporters: ["text", "lcov"],
};

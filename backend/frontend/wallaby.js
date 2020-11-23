module.exports = function(wallaby) {
  return {
    // tell wallaby to use automatic configuration
    autoDetect: true,

    files: [
      { pattern: "src/containers/**/*.js*", load: false },
      "!semantic/**/*",
      "!node_modules/**/*",
    ],

    tests: ["src/test/MainPage/**/*.js"],

    compilers: {
      "**/*.js*": wallaby.compilers.babel(),
    },
    testFramework: "mocha",

    env: { type: "node" },
  };
};

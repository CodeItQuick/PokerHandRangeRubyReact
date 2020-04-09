var wallabyWebpack = require('wallaby-webpack');


var webpackPostprocessor = wallabyWebpack({
  // webpack options
  emitModulePaths: true,

  entry: {
    test: 'src/*spec.js',
  },
  resolve: {
    extensions: ['.js', '.jsx']
  }
});

module.exports = function (wallaby) {

  return {
    files: [
      {pattern: 'src/**/*.js*', load: false},
      {pattern: "!semantic/**/*", load: false},
      {pattern: "!src/*.test.js*", load: false},
    ],

    tests: [
      {pattern: 'test/*.spec.js*', load: false}
    ],

    compilers: {
      '**/*.js*': wallaby.compilers.babel()
    },

    env: {kind: 'chrome'},

    postprocessor: webpackPostprocessor,

    setup: function () {
      window.__moduleBundler.loadTests();
    }
  };
};
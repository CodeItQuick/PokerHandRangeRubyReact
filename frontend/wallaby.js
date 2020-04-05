var wallabyWebpack = require('wallaby-webpack');

module.exports = function (wallaby) {

  var webpackPostprocessor = wallabyWebpack({
    // webpack options
    resolve: {
      extensions: ['.js', '.jsx']
    }
  });

  return {
    files: [
      {pattern: 'src/**/*.js*', load: false},
      "!semantic/**/*",
      "!src/**/*.test.js*",
    ],

    tests: [
      {pattern: 'test/**/*Spec.js*', load: false}
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
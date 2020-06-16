
module.exports = function (wallaby) {

  return {// tell wallaby to use automatic configuration
    autoDetect: true,

    files: [
      {pattern: 'src/**/*.js*', load: false},
      "!semantic/**/*",
      "!node_modules/**/*"
    ],

    tests: [
      'test/**/*.js'
    ],

    compilers: {
      '**/*.js*': wallaby.compilers.babel()
    },
    testFramework: 'mocha',

    env: {type: 'node'},


  };
};

module.exports = function (wallaby) {

    // Babel, jest-cli and some other modules may be located under
    // react-scripts/node_modules, so need to let node.js know about it
    var path = require('path');
    process.env.NODE_PATH +=
        path.delimiter +
        path.join(__dirname, 'node_modules') +
        path.delimiter +
        path.join(__dirname, 'node_modules/react-scripts/node_modules');
    require('module').Module._initPaths();
  
    return {
        files: [
            'jsconfig.json',
            'src/**/*.+(js|jsx|json|snap|css|less|sass|scss|jpg|jpeg|gif|png|svg)',
            '!src/**/*.test.js?(x)'
        ],
  
        tests: ['src/**/*.test.js?(x)'],
  
        env: {
            type: 'node'
        },
  
        compilers: {
            '**/*.js?(x)': wallaby.compilers.babel({
                presets: ['react-app']
            })
        },
  
        setup: wallaby => {
            const createJestConfigUtil = require('react-scripts/scripts/utils/createJestConfig');
            const jestConfig = createJestConfigUtil(p => require.resolve('react-scripts/' + p));
            Object.keys(jestConfig.transform || {})
              .forEach(k => ~k.indexOf('^.+\\.(js|jsx') && void delete jestConfig.transform[k]);
            delete jestConfig.testEnvironment;
            wallaby.testFramework.configure(jestConfig);
        },
  
        testFramework: 'jest'
    };
  };
module.exports = function(config) {
  config.set({
    frameworks: ['mocha', 'chai'],
    files: [
      {pattern: 'src/js/*.js', included: false},
      'node_modules/babel-core/browser-polyfill.js',
      'src/js/test/*Test.js'
    ],
    preprocessors: {
      'src/js/test/*Test.js': ['webpack']
    },
    webpack: {
      resolve: {
        modulesDirectories: ['node_modules', 'src/js']
      },
      module: {
        loaders: [{test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader'}]
      }
    },
    webpackMiddleware: {
      noInfo: true
    },
    reporters: ['progress'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: false,
    browsers: ['PhantomJS'],
    captureTimeout: 60000,
    singleRun: true
  });
};

import gulp from 'gulp';
import gulpUtil from 'gulp-util';
import path from 'path';
import del from 'del';
import {argv} from 'yargs';
import eslint from 'gulp-eslint';
import {Server} from 'karma';
import webpack from 'webpack';
import express from 'express';
import webpackConfig from './webpack.config.js';

gulp.task('lint', () => {
  return gulp.src(['*.js','src/js/**/*.js'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failOnError());
});

gulp.task('test', (done) => {
  new Server({
    configFile: path.join(__dirname, 'karma.conf.js'),
  }, done).start();
});

gulp.task('build', (done) => {
  let config = {devtool: 'sourcemap', debug: true};

  if (argv.production) {
    config = {plugins: webpackConfig.plugins.concat(
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.OccurenceOrderPlugin(),
      new webpack.optimize.UglifyJsPlugin()
    )};
    del('dist/**/*.map');
  }
  webpack(Object.assign({}, webpackConfig, config), (error, stats) => {
    if (error) {
      throw new gulpUtil.PluginError('webpack', error);
    }
    gulpUtil.log('[webpack]', stats.toString({
      chunkModules: false,
      colors: true
    }));
    done();
  });
});

gulp.task('server', (done) => {
  const server = express();
  let port = 3000;

  if (Number.isInteger(argv.port)) {
    port = argv.port;
  }
  server.use('/dist', express.static('dist'));
  server.all(/\/(index.html)?/, (request, response) => {
    response.sendFile(path.join(__dirname, 'index.html'));
  });

  server.listen(port, () => {
    gulpUtil.log('[express]', `Server listening on port ${port}`);
    done();
  }).on('error', function(error) {
    gulpUtil.log(gulpUtil.colors.red(`Error ${error.message}`));
    done();
  });
});

gulp.task('default', ['lint', 'test']);
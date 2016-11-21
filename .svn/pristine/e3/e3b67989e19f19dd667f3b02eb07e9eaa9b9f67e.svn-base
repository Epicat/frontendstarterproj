'use strict';

var browserify = require('browserify');
var source = require('vinyl-source-stream');
var babelify = require('babelify');
var flatten = require('gulp-flatten');
var buffer = require('vinyl-buffer');
var uglify = require('gulp-uglify');
var gif = require('gulp-if');
var runSequence = require('run-sequence');
var rename = require('gulp-rename');

module.exports = function (gulp, SETTINGS) {
  var uglifySettings = {
    indent_start: 0,
    indent_level: 4,
    quote_keys: false,
    space_colon: true,
    ascii_only: false,
    inline_script: false,
    width: 80,
    max_line_len: 32000,
    beautify: false,
    source_map: false,
    bracketize: false,
    comments: false,
    semicolons: true,
  };

  return function () {

    // js build task
    // When created: used for transpiling es6, for react usage.
    gulp.task('js', function (cb) {
      process.env.NODE_ENV = SETTINGS.environment;
      if (process.env.NODE_ENV != SETTINGS.environment) {
        throw new Error('Failed! set NODE_ENV: ' + SETTINGS.environment);
      }

      browserify({
        entries: 'src/Assets/js/b-es6.js',
        debug: SETTINGS.js.debug,
      })
      .transform(babelify, { sourceMaps: SETTINGS.js.sourceMaps })
      .bundle()
      .pipe(source('src/Assets/js/b-es6.js'))
      .pipe(gif(SETTINGS.js.minify, buffer()))
      .pipe(gif(SETTINGS.js.minify, uglify({
        output: uglifySettings,
      })))
      .pipe(rename('b-es6.build.js'))
      .pipe(flatten())
      .pipe(gulp.dest(SETTINGS.paths.src));
      cb();
    });
  };
};

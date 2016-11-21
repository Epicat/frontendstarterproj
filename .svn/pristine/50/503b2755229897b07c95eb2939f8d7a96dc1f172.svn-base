var flatten = require('gulp-flatten');
var rename = require('gulp-rename');
var runSequence = require('run-sequence');
var usemin = require('gulp-usemin');
var uglify = require('gulp-uglify');

var uglifySettings = {
  compress: {
    'drop_console': false
  },
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

module.exports = function (gulp, SETTINGS) {
  return function () {

    // Build to extenal source like a cms
    gulp.task('cms', ['css', 'js'], function (cb) {

      //COPY.IMAGES
    	gulp.src('./src/Assets/img/**/*', { base: './src/Assets' })
    		.pipe(gulp.dest('./' + SETTINGS.paths.cms));

      //COPY.JS
    	gulp.src('./src/Assets/js/**/*', { base: './src/Assets' })
    		.pipe(gulp.dest('./' + SETTINGS.paths.cms));

      //COPY.CSS
    	gulp.src('./src/Assets/css/**/*', { base: './src/Assets' })
    		.pipe(gulp.dest('./' + SETTINGS.paths.cms));

      //CMS.VENDOR.JS
    	gulp.src('./src/start.html', { base: './src' })
        .pipe(usemin({
          html: [function () { return; } ],
          css: [function () { return; } ],
    			jsVendor: [
    			  uglify.bind(this, uglifySettings)
    			],
          js: [
            uglify.bind(this, uglifySettings)
          ]
        }))
    		.pipe(flatten())
        .pipe(gulp.dest('./' + SETTINGS.paths.cms + '/js'));

      cb();

    });

  };
};

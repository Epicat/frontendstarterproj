var sass = require('gulp-sass');
var gif = require('gulp-if');
var autoprefixer = require('gulp-autoprefixer');
var flatten = require('gulp-flatten');

module.exports = function (gulp, SETTINGS) {

  var autoprefixerOptions = {
     browsers: ['last 4 versions'],
     cascade: false,
  };

  return function () {
    // Precompile scss to css
    gulp.task('css', function (cb) {
    	gulp.src(SETTINGS.paths.scss + '/*.scss')
    		// compile sass to css
    		.pipe(
    			sass({
    				// add external tools to scope for imports
    				includePaths: [
    					SETTINGS.paths.bower + '/normalize-scss/',
    					SETTINGS.paths.bower + '/susy/sass/'
    				]
    			})
    			// log error and keep watchers from stopping when error occurs
    			.on('error', sass.logError)
    		)
        .pipe(gif(SETTINGS.css.autoprefix, autoprefixer(autoprefixerOptions)))
    		.pipe(gulp.dest(SETTINGS.paths.css));
      cb();
    });
  };
};

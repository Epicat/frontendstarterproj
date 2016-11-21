var bump = require('gulp-bump');
var semver = require('semver');
var replace = require('gulp-replace');

module.exports = function (gulp, SETTINGS) {
  return function () {

    // Bump version information in application files
    // --version (-v) version to apply
    gulp.task('bump', function () {
    	var config = {
        version: '',
      };

    	if (/^(\d+\.\d+\.\d+)/.test(SETTINGS.options.ver)) {
    		config.version = SETTINGS.options.ver;
    	} else {
    		config.version = semver.inc(require('./' + SETTINGS.paths.src + '/prototype.json').version, SETTINGS.options.ver);
    	}

    	gulp.src([
    			'bower.json',
    			'package.json',
    			SETTINGS.paths.src + '/prototype.json'
    		],
    		{
    			base: '.'
    		})
    		.pipe(bump(config))
    		.pipe(gulp.dest('.'));

    	/**
    	 * This subtask expects to find the version meta tag
    	 */
    	gulp.src([
    			SETTINGS.paths.njhtml + '/layouts/site.njhtml',
    			SETTINGS.paths.html + '/*.html'
    		],
    		{
    			base: SETTINGS.paths.src
    		})
    		.pipe(replace(/(<meta\s*name="version"\s*content=".*)/, '<meta name="version" content="' + config.version + '">'))
    		.pipe(gulp.dest(SETTINGS.paths.src));
    });

  };
};

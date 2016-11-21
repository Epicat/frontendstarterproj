var replace = require('gulp-replace');

module.exports = function (gulp, SETTINGS) {
  return function () {

    // Export asset source files and project configuration as an importable bundle
    gulp.task('export', ['cleanExport'], function () {
    	// Project config
    	gulp.src(['.eslintrc', 'bower.json'])
    		.pipe(gulp.dest(SETTINGS.paths.export));

    	gulp.src('package.json')
    		// remove prototype dependencies
    		.pipe(replace(/,[\s]*"optionalDependencies".+\{[\s\S]*?\}/, ''))
    		.pipe(gulp.dest(SETTINGS.paths.export));

    	// Project config files containing paths
    	gulp.src(['gulpfile.js', '.bowerrc'])
    		// turn prototype flag false
    		.pipe(replace(/var\s+PROTOTYPE\s*=\s*true/, 'var PROTOTYPE = false'))
    		// set paths.src to .
    		.pipe(replace(/paths\.src\s*=\s*'src'/, 'paths.src = \'.\''))
    		// set paths.root to empty
    		.pipe(replace(/paths\.root\s*=\s*paths\.src/, 'paths.root = \'\''))
    		// set paths.dist to .
    		.pipe(replace(/paths\.dist\s*=\s*'dist'/, 'paths.dist = \'.\''))
    		// adjust bower directory
    		.pipe(replace(/"directory":\s*"src\//, '"directory": "/'))
    		.pipe(gulp.dest(SETTINGS.paths.export));

    	// Source files
    	gulp.src([
    			SETTINGS.paths.src + '/*.*',
    			'!' + SETTINGS.paths.src + '/*.html',
    			'!' + SETTINGS.paths.src + '/prototype.json',
    			SETTINGS.paths.assets + '/**/'
    		],
    		{
          base: SETTINGS.paths.src,
        }
    	)
    	.pipe(gulp.dest(SETTINGS.paths.export));
    });

  };
};

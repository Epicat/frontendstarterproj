var watch = require('gulp-watch');

module.exports = function (gulp, SETTINGS) {
  return function () {

    console.log('watch', [SETTINGS.paths.scss + '/**/*.scss']);

    // Watch source files
    gulp.task('watch', function () {

      watch([SETTINGS.paths.scss + '/**/*.scss'],
    		function () {
    			gulp.start('post-css');
    		}
    	);

    	if (SETTINGS.prototype === true) {
    		// TODO figure out cleaner way to only compile modified page
    		// only page files
    		watch([SETTINGS.paths.njhtml + '/*.njhtml'],
    			{events: ['change']},
    			function (vinyl) {
    				// save changed page for individual compiling later.
    				SETTINGS.page.changed = vinyl.path;
    				gulp.start('post-html');
    			}
    		);

    		// partials and what not
    		watch([SETTINGS.paths.njhtml + '/*/*.njhtml'],
    			{events: ['change']},
    			function () {
    				gulp.start('post-html');
    			}
    		);
    	}
    });

  };
};

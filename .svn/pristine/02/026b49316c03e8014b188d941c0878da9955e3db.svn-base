module.exports = function (gulp, SETTINGS, browserSync) {
  return function () {

    // Start http server and watch for file changes
    gulp.task('server', function () {
    	browserSync.init({
    		server: SETTINGS.paths.src,
    		port: 3000,
    		// feel free to enable these features if needed
    		ghostMode: {
    			clicks: false,
    			scroll: false,
    			forms: false
    		}
    	});

    	gulp.start('watch');
    });

  };
};

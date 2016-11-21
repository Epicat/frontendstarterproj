module.exports = function (gulp, SETTINGS) {
  return function () {

    // Build source files and copy assets to dist copy
    gulp.task('build', function () {
    	console.log('build task ran with following options:\n', SETTINGS.options);
    	var postBuild = [];
    	if (SETTINGS.prototype === true) postBuild.push('includeFilesInCsproj');
    		gulp.start(
    		'copyAssets',
        'usemin',
    		postBuild
    	);
    });
    //['copyAssets', 'usemin'],
  };
};
